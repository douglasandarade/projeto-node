import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas Andrade',
      email: 'douglas@example.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'Douglas',
      email: 'douglas@examplo.com',
    });

    expect(user.name).toBe('Douglas');
  });

  it('should not be able update the profile from not-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'Teste',
        email: 'teste@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas Andrade',
      email: 'douglas@example.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Douglas Andrade',
      email: 'douglas@examplo.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Douglas',
        email: 'douglas@examplo.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas Andrade',
      email: 'douglas@example.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'Douglas',
      email: 'douglas@examplo.com',
      old_password: '123456',
      password: '123123',
    });

    expect(user.password).toBe('123123');
  });

  it('should not be able to update the password whitout old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas Andrade',
      email: 'douglas@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Douglas',
        email: 'douglas@examplo.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Douglas Andrade',
      email: 'douglas@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Douglas',
        email: 'douglas@examplo.com',
        old_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
