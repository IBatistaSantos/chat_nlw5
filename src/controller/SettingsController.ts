import { Request, Response } from 'express';
import { CreateSettingsUseCase } from '../useCase/createSetting/CreateSettingUseCase';

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
}

export { SettingsController };
