import { Test } from '@nestjs/testing';
import { PrismaService } from '~/common/services';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let prismaService: PrismaService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
          },
        },
        UserRepository,
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('create', () => {
    const mockedValue = {
      email: 'example@gmail.com',
      name: 'Tony Stark',
      password: '##8765',
    };

    it('should call create and return empty object', async () => {
      prismaService.user.create = jest.fn().mockReturnValueOnce({});
      const response = await userRepository.create(mockedValue);
      expect(response).toEqual({});
    });
  });
});
