import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  findAll() {
    return this.repo.find();
  }

  updateStatus(id: number, status: string) {
    return this.repo.update(id, { status });
  }
}
