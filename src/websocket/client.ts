import { io } from '../http';
import { CreateConnectionUseCase } from '../useCase/createConnection/CreateConnectionUseCase';
import { CreateMessageUseCase } from '../useCase/createMessage/CreateMessageUseCase';
import { CreateUserUseCase } from '../useCase/createUser/CreateUserUseCase';
import { FindConnectionBySocketIDUseCase } from '../useCase/findConnectionBySocketId/FindConnectionBySocketIdUseCase';
import { ListCustomerServiceOpenUseCase } from '../useCase/listCustomerServiceOpen/ListCustomerServiceOpenUseCase';
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
  const listCustomerServiceOpen = new ListCustomerServiceOpenUseCase();
  const findConnectionBySocketIDUseCase = new FindConnectionBySocketIDUseCase();

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

    const allUsers = await listCustomerServiceOpen.execute();

    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await findConnectionBySocketIDUseCase.execute(
      socket_id
    );
    const message = await createMessageUseCase.execute({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
