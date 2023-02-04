import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    const mockedValue = {
      email: 'example@gmail.com',
      name: 'Tony Stark',
      password: '##8765',
    };

    it('should call create and return empty object', async () => {
      userRepository.create = jest.fn().mockReturnValueOnce({});
      const response = await usersService.create(mockedValue);
      expect(response).toEqual({});
    });
  });
});
