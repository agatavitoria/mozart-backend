import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UnexpectedError } from '../common/errors';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    const userParams = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: faker.internet.password(),
    };

    it('should return an error if no pass required values', async () => {
      const promise = service.create({} as any);
      await expect(promise).rejects.toThrow(UnexpectedError);
    });

    it('should return object', async () => {
      userRepository.create = jest.fn().mockReturnValueOnce({});
      const response = await service.create(userParams);
      expect(response).toEqual({});
    });

    it('should call one time', async () => {
      userRepository.create = jest.fn().mockReturnValueOnce({});
      await service.create(userParams);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveReturnedTimes(1);
    });
  });
});
