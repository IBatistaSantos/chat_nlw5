import { getCustomRepository } from 'typeorm';
import { Connection } from '../../entities/Connection';
import { ConnectionsRepository } from '../../repositories/ConnectionsRepository';

class ListCustomerServiceOpenUseCase {
  async execute(): Promise<Connection[]> {
    const connectionRepository = getCustomRepository(ConnectionsRepository);

    const connection = await connectionRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });
    return connection;
  }
}

export { ListCustomerServiceOpenUseCase };
