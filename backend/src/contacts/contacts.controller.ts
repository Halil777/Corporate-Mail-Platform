import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateContactDto) {
    return this.service.create(dto);
  }
}
