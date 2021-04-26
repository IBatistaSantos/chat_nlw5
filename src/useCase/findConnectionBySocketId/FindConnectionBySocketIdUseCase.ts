import { getCustomRepository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

class FindConnectionBySocketIDUseCase {
  async execute(socket_id: string): Promise<Connection> {
    const connectionRepository = getCustomRepository(ConnectionsRepository);

    const connection = await connectionRepository.findOne({
      where: { socket_id },
    });
    return connection;
  }
}

export { FindConnectionBySocketIDUseCase };
