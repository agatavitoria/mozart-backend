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
            get: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
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

  describe('findOne', () => {
    it('should return an error if no pass userId', async () => {
      const promise = service.findOne(null as any);
      await expect(promise).rejects.toThrow(UnexpectedError);
    });

    it('should return object', async () => {
      const uuid = faker.datatype.uuid();
      userRepository.get = jest.fn().mockReturnValueOnce({});
      const response = await service.findOne(uuid);
      expect(response).toEqual({});
    });

    it('should call one time', async () => {
      const uuid = faker.datatype.uuid();
      userRepository.get = jest.fn().mockReturnValueOnce({});
      await service.findOne(uuid);
      expect(userRepository.get).toHaveBeenCalledTimes(1);
      expect(userRepository.get).toHaveReturnedTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return list', async () => {
      userRepository.getAll = jest.fn().mockReturnValueOnce([]);
      const response = await service.findAll();
      expect(response).toEqual([]);
    });

    it('should call one time', async () => {
      userRepository.getAll = jest.fn().mockReturnValueOnce([]);
      await service.findAll();
      expect(userRepository.getAll).toHaveBeenCalledTimes(1);
      expect(userRepository.getAll).toHaveReturnedTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should return an error if no pass userId', async () => {
      const promise = service.deleteUser(null as any);
      await expect(promise).rejects.toThrow(UnexpectedError);
    });

    it('should return an object', async () => {
      const uuid = faker.datatype.uuid();
      userRepository.delete = jest.fn().mockReturnValueOnce({});
      const response = await service.deleteUser(uuid);
      expect(response).toEqual({});
    });

    it('should call one time', async () => {
      const uuid = faker.datatype.uuid();
      userRepository.delete = jest.fn().mockReturnValueOnce({});
      await service.deleteUser(uuid);
      expect(userRepository.delete).toHaveBeenCalledTimes(1);
      expect(userRepository.delete).toHaveReturnedTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should return an error if no pass userId', async () => {
      const promise = service.updateUser({} as any);
      await expect(promise).rejects.toThrow(UnexpectedError);
    });

    it('should return an object', async () => {
      const params = {
        userId: faker.datatype.uuid(),
        email: faker.internet.email(),
        name: faker.name.firstName(),
      };
      userRepository.update = jest.fn().mockReturnValueOnce({});
      const response = await service.updateUser(params);
      expect(response).toEqual({});
    });

    it('should call one time', async () => {
      const params = { userId: faker.datatype.uuid() };
      userRepository.update = jest.fn().mockReturnValueOnce({});
      await service.updateUser(params);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
      expect(userRepository.update).toHaveReturnedTimes(1);
    });
  });
});
