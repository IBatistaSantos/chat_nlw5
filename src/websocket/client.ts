import { io } from '../http';
import { CreateConnectionUseCase } from '../useCase/createConnection/CreateConnectionUseCase';
import { CreateMessageUseCase } from '../useCase/createMessage/CreateMessageUseCase';
import { CreateUserUseCase } from '../useCase/createUser/CreateUserUseCase';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const createConnectionUseCase = new CreateConnectionUseCase();
  const createUserUseCase = new CreateUserUseCase();
  const createMessageUseCase = new CreateMessageUseCase();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    const user = await createUserUseCase.execute(email);

    await createConnectionUseCase.execute({
      socket_id,
      user_id: user.id,
    });

    await createMessageUseCase.execute({
      text,
      user_id: user.id,
    });
  });
});
