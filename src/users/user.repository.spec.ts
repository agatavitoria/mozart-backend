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
              findMany: jest.fn(),
              createUser: jest.fn(),
              deleteUser: jest.fn(),
              updateUser: jest.fn(),
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

  it('should call getUser and return an object', async () => {
    prismaService.user.findUnique = jest.fn().mockReturnValueOnce({});
    const response = await userRepository.getUser({ id: 'uuid' });

    expect(response).toEqual({});
    expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findUnique).toHaveReturnedTimes(1);
  });

  it('should call getAll and return empty array', async () => {
    prismaService.user.findMany = jest.fn().mockReturnValueOnce([]);
    const response = await userRepository.getAll({});

    expect(response).toEqual([]);
    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findMany).toHaveReturnedTimes(1);
  });

  it('should call create and return empty object', async () => {
    prismaService.user.create = jest.fn().mockReturnValueOnce({});
    const response = await userRepository.createUser({} as any);

    expect(response).toEqual({});
    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
    expect(prismaService.user.findMany).toHaveReturnedTimes(1);
  });

  it('should call update and return empty object', async () => {
    const mockedValues = {
      where: { id: 'uuid' },
      data: {},
    };

    prismaService.user.update = jest.fn().mockReturnValueOnce({});
    const response = await userRepository.updateUser(mockedValues);

    expect(response).toBeTruthy();
    expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    expect(prismaService.user.update).toHaveReturnedTimes(1);
  });

  it('should call delete and return empty object', async () => {
    prismaService.user.delete = jest.fn().mockReturnValueOnce({});
    const response = await userRepository.deleteUser('uuid');

    expect(response).toBeTruthy();
    expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    expect(prismaService.user.delete).toHaveReturnedTimes(1);
  });
});
