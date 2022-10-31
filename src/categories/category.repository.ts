import { Injectable } from '@nestjs/common';
import { Category as CategoryModel, Prisma } from '@prisma/client';
import { PrismaService } from '../common/services';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<CategoryModel> {
    return await this.prismaService.category.create({
      data,
    });
  }
}
