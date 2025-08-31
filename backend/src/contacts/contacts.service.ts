import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  findAll() {
    return this.repo.find();
  }

  create(dto: CreateContactDto) {
    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }
}
