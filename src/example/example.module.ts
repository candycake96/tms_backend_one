import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService, DatabaseService],
})
export class ExampleModule {}
