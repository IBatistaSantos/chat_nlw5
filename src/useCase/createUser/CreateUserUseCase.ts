import { getCustomRepository } from 'typeorm';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

class CreateUserUseCase {
  async execute(email: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({ email: email });

    if (userExists) {
      return userExists;
    }

    const user = userRepository.create({ email });
    await userRepository.save(user);
    return user;
  }
}

export { CreateUserUseCase };
