import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [PrismaModule],
})
export class ArticlesModule { }
