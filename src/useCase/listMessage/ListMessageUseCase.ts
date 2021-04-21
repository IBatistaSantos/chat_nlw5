import { getCustomRepository } from 'typeorm';
import { Message } from '../../entities/Message';
import { MessageRepository } from '../../repositories/MessageRepository';

class ListMessageUseCase {
  async execute(user_id: string): Promise<Message[]> {
    const messageRepository = getCustomRepository(MessageRepository);
    const list = messageRepository.find({
      where: { user_id },
      relations: ['user'],
    });
    return list;
  }
}

export { ListMessageUseCase };
