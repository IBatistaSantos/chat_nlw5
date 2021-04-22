import { getCustomRepository } from 'typeorm';
import { Settings } from '../../entities/Settings';
import { SettingsRepository } from '../../repositories/SettingsRepository';

class UpdateSettingsUseCase {
  async execute(username: string, chat: boolean): Promise<void> {
    const settingsRepository = getCustomRepository(SettingsRepository);
    await settingsRepository
      .createQueryBuilder()
      .update(Settings)
      .set({ chat })
      .where('username = :username', { username })
      .execute();
  }
}

export { UpdateSettingsUseCase };
