import { ApiProperty } from "@nestjs/swagger";
import { Article } from "@prisma/client";

import { UserEntity } from "src/users/entities/user.entity";

export class ArticleEntity implements Article {
  constructor({ author, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  authorId: number;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;
}
