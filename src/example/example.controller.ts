import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('users') // path: /example/users
  async getUsers() {
    // Controller เรียก Service
    return this.exampleService.getUsers();
  }
}
