import { io } from '../http';
import { ListCustomerServiceOpenUseCase } from '../useCase/listCustomerServiceOpen/ListCustomerServiceOpenUseCase';

io.on('connect', async (socket) => {
  const listCustomerServiceOpen = new ListCustomerServiceOpenUseCase();

  const allConntectionsWithoutAdmin = await listCustomerServiceOpen.execute();
});
