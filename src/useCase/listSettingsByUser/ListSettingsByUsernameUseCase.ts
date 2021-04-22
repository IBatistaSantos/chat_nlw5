import { getCustomRepository } from 'typeorm';
import { Settings } from '../../entities/Settings';
import { SettingsRepository } from '../../repositories/SettingsRepository';

class ListSettingsByUsernameUseCase {
  async execute(username: string): Promise<Settings> {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const settings = settingsRepository.findOne({
      username,
    });
    return settings;
  }
}

export { ListSettingsByUsernameUseCase };
