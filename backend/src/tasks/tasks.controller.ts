import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(+id, status);
  }
}
