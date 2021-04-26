import { io } from '../http';
import { CreateMessageUseCase } from '../useCase/createMessage/CreateMessageUseCase';
import { ListConnectionByUserUseCase } from '../useCase/listConnectionByUser/ListConnectionByUserUseCase';
import { ListCustomerServiceOpenUseCase } from '../useCase/listCustomerServiceOpen/ListCustomerServiceOpenUseCase';
import { ListMessageUseCase } from '../useCase/listMessage/ListMessageUseCase';

io.on('connect', async (socket) => {
  const listCustomerServiceOpen = new ListCustomerServiceOpenUseCase();
  const listMessages = new ListMessageUseCase();
  const createMessage = new CreateMessageUseCase();
  const listConnectionByUser = new ListConnectionByUserUseCase();

  const allConntectionsWithoutAdmin = await listCustomerServiceOpen.execute();

  io.emit('admin_list_all_users', allConntectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params;
    const allMessages = await listMessages.execute(user_id);
    callback(allMessages);
  });

  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;

    await createMessage.execute({
      user_id,
      text,
      admin_id: socket.id,
    });
    const { socket_id } = await listConnectionByUser.execute(user_id);
    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });
});
