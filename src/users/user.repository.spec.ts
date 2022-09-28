import { Test } from '@nestjs/testing';
import { PrismaService } from '../common/services';
import { UserRepository } from '../users/user.repository';

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
              findUnique: jest.fn(),
            },
          },
        },
        UserRepository,
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return an object', async () => {
    prismaService.user.findUnique = jest.fn().mockReturnValueOnce({} as any);
    const response = await userRepository.getUser({ id: 'uuid' });

    expect(response).toEqual({});
    expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findUnique).toHaveReturnedTimes(1);
  });
});
