import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should call createUser and return error', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce({} as any);
      const promise = controller.createUser({} as any);
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    it('should call createUser and return object', async () => {
      const mockValue = {} as any;
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(async () => mockValue);
      const response = await controller.createUser({} as any);
      expect(response).toEqual({ data: { user: {} } });
    });
  });

  describe('getUser', () => {
    it('should call getUser and return error', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce({} as any);
      const promise = controller.getUser({} as any);
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    it('should call getUser and return object', async () => {
      const mockValue = {} as any;
      const uuid = faker.datatype.uuid();
      jest
        .spyOn(service, 'findOne')
        .mockImplementationOnce(async () => mockValue);
      const response = await controller.getUser(uuid);
      expect(response).toEqual({ data: { user: {} } });
    });
  });

  describe('getAll', () => {
    it('should call getAll and return error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce({} as any);
      const promise = controller.gelAll();
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    it('should call getAll and return list', async () => {
      const mockValue = [{ id: faker.datatype.uuid() }] as any;
      jest
        .spyOn(service, 'findAll')
        .mockImplementationOnce(async () => mockValue);
      const { data } = await controller.gelAll();
      expect(data.users.length).toBe(1);
    });
  });
});
