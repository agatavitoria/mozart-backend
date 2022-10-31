import { Test } from '@nestjs/testing';
import { PrismaService } from '../common/services';
import { CategoryRepository } from './category.repository';

describe('CategoryRepository', () => {
  let prismaService: PrismaService;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            category: {
              create: jest.fn(),
            },
          },
        },
        CategoryRepository,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should call create and return empty object', async () => {
    prismaService.category.create = jest.fn().mockReturnValueOnce({});
    const response = await categoryRepository.create({} as any);
    expect(response).toEqual({});
    expect(prismaService.category.create).toHaveBeenCalledTimes(1);
    expect(prismaService.category.create).toHaveReturnedTimes(1);
  });
});
