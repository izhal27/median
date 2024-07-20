import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ArticlesModule, PrismaModule.forRoot({ isGlobal: true }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
