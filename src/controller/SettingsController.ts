import { Request, Response } from 'express';
import { CreateSettingsUseCase } from '../useCase/createSetting/CreateSettingUseCase';
import { ListSettingsByUsernameUseCase } from '../useCase/listSettingsByUser/ListSettingsByUsernameUseCase';
import { UpdateSettingsUseCase } from '../useCase/updateSettings/UpdateSettingsUseCase';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body;
    const createSettingUseCase = new CreateSettingsUseCase();

    try {
      const settings = await createSettingUseCase.execute({ chat, username });
      return response.status(201).json(settings);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async listSettings(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const listSettings = new ListSettingsByUsernameUseCase();

    const settings = await listSettings.execute(username);
    return response.status(200).json(settings);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const updateSettings = new UpdateSettingsUseCase();

    await updateSettings.execute(username, chat);

    return response.send();
  }
}

export { SettingsController };
