import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) { }

  create(createArticleDto: CreateArticleDto) {
    return this.prismaService.article.create({ data: createArticleDto })
  }

  findAll() {
    return this.prismaService.article.findMany({
      include: {
        author: true
      }
    });
  }

  findAllDrafts() {
    return this.prismaService.article.findMany({
      where: { published: false, }, include: {
        author: true
      }
    });
  }

  async findOne(id: number) {
    const article = await this.prismaService.article.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} does not exist.`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prismaService.article.update({ where: { id }, data: updateArticleDto });
  }

  async remove(id: number) {
    return this.prismaService.article.delete({ where: { id } });
  }
}
