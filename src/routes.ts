import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsController } from './controller/SettingsController';
import { SettingsRepository } from './repositories/SettingsRepository';

const router = Router();
const settingsController = new SettingsController();
router.post('/settings', settingsController.create);

export { router };
