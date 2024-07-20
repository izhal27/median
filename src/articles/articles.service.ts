import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

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
      throw new NotFoundException(`Article with id ${id} does not exist.`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({ where: { id }, data: updateArticleDto });
  }

  async remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
