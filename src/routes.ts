import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsController } from './controller/SettingsController';
import { UserController } from './controller/UserController';
import { SettingsRepository } from './repositories/SettingsRepository';

const router = Router();
const settingsController = new SettingsController();
const userController = new UserController();
router.post('/settings', settingsController.create);
router.post('/users', userController.create);
export { router };
