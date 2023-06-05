import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { snakeKeys } from '~/common/utils';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('Create', () => {
    const mockedUser = {
      email: 'example+2@email.com',
      name: 'Tony Stark',
      password: '##123',
      profileName: 'Tony',
    }
    const mockedResponse = {
      id: '524756c3-a956-4cb5-828d-71f3409e5f3d',
      ...mockedUser,
    };

    it('should create a user', async () => {
      usersService.create = jest.fn().mockReturnValueOnce(mockedResponse);
      const response = await usersController.create(mockedUser);
      const userInSnack = snakeKeys(mockedResponse);
      expect(response).toEqual({ data: userInSnack });
    });

    it ('should call create user and throw error', async () => {
      usersService.create = jest.fn().mockRejectedValue(new Error())
      const promise = usersController.create(mockedUser);
      await expect(promise).rejects.toThrow(new BadRequestException())
    });
  });
});
