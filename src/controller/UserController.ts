import { Request, Response } from 'express';
import { CreateUserUseCase } from '../useCase/createUser/CreateUserUseCase';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const createUserUseCase = new CreateUserUseCase();

    try {
      const user = await createUserUseCase.execute(email);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export { UserController };
