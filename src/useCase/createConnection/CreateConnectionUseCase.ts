import { getCustomRepository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

interface ICreateConnection {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}
class CreateConnectionUseCase {
  async execute({
    socket_id,
    user_id,
    admin_id,
    id,
  }: ICreateConnection): Promise<Connection> {
    const connectionRepository = getCustomRepository(ConnectionsRepository);
    const connection = connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await connectionRepository.save(connection);
    return connection;
  }
}

export { CreateConnectionUseCase };
