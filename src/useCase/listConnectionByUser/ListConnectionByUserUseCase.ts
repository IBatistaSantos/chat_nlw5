import { getCustomRepository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

class ListConnectionByUserUseCase {
  async execute(user_id: string): Promise<Connection> {
    const connectionRepository = getCustomRepository(ConnectionsRepository);

    const connection = await connectionRepository.findOne({
      where: { user_id },
    });
    return connection;
  }
}

export { ListConnectionByUserUseCase };
