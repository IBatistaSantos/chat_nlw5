import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { MessageController } from './controller/MessageController';
import { SettingsController } from './controller/SettingsController';
import { UserController } from './controller/UserController';
import { SettingsRepository } from './repositories/SettingsRepository';

const router = Router();
const settingsController = new SettingsController();
const userController = new UserController();
const messageController = new MessageController();

router.post('/settings', settingsController.create);
router.get('/settings/:username', settingsController.listSettings);
router.put('/settings/:username', settingsController.update);

router.post('/users', userController.create);

router.post('/messages', messageController.create);
router.get('/messages/:id', messageController.list);
export { router };
