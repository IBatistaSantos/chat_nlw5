import { getCustomRepository } from 'typeorm';
import { Message } from '../../entities/Message';
import { MessageRepository } from '../../repositories/MessageRepository';

interface ICreateMessager {
  user_id?: string;
  admin_id: string;
  text: string;
}
class CreateMessageUseCase {
  async execute({
    user_id,
    admin_id,
    text,
  }: ICreateMessager): Promise<Message> {
    const messageRepository = getCustomRepository(MessageRepository);

    const message = messageRepository.create({ admin_id, user_id, text });
    await messageRepository.save(message);
    return message;
  }
}

export { CreateMessageUseCase };
