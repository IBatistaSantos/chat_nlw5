import { Request, Response } from 'express';
import { CreateMessageUseCase } from '../useCase/createMessage/CreateMessageUseCase';
import { ListMessageUseCase } from '../useCase/listMessage/ListMessageUseCase';
class MessageController {
  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;
    const createMessageUseCase = new CreateMessageUseCase();

    try {
      const message = await createMessageUseCase.execute({
        admin_id,
        user_id,
        text,
      });
      return response.status(201).json(message);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listMessageUseCase = new ListMessageUseCase();

    try {
      const message = await listMessageUseCase.execute(id);
      return response.status(201).json(message);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { MessageController };
