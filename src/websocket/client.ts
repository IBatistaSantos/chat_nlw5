import { io } from '../http';
import { CreateConnectionUseCase } from '../useCase/createConnection/CreateConnectionUseCase';
import { CreateMessageUseCase } from '../useCase/createMessage/CreateMessageUseCase';
import { CreateUserUseCase } from '../useCase/createUser/CreateUserUseCase';
import { ListMessageUseCase } from '../useCase/listMessage/ListMessageUseCase';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const createConnectionUseCase = new CreateConnectionUseCase();
  const createUserUseCase = new CreateUserUseCase();
  const createMessageUseCase = new CreateMessageUseCase();
  const listMessageUseCase = new ListMessageUseCase();
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

    const allMessages = await listMessageUseCase.execute(user.id);
    socket.emit('client_list_all_messages', allMessages);
  });
});
