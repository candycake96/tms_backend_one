import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExampleService {
  constructor(private readonly db: DatabaseService) {}

  async getUsers() {
    return this.db.executeQuery(
      'SELECT * FROM company'
    );
  }
}
