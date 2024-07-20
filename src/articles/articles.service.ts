import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto })
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findAllDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.findOne(id);
    return this.prisma.article.update({ where: { id }, data: updateArticleDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.article.delete({ where: { id } });
  }
}
