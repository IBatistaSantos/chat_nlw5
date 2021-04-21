import { getCustomRepository } from 'typeorm';
import { Settings } from '../../entities/Settings';
import { SettingsRepository } from '../../repositories/SettingsRepository';

interface IRequest {
  chat: boolean;
  username: string;
}
class CreateSettingsUseCase {
  async execute({ chat, username }: IRequest): Promise<Settings> {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const settings = settingsRepository.create({
      chat,
      username,
    });

    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    await settingsRepository.save(settings);

    return settings;
  }
}

export { CreateSettingsUseCase };
