import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProposalPriceModule } from './proposal_price/proposal_price.module';
import { LoginModule } from './login/login.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ExampleService } from './example/example.service';
import { ExampleController } from './example/example.controller';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [ProposalPriceModule, LoginModule, DatabaseModule, ExampleModule],
  controllers: [AppController, ExampleController],
  providers: [AppService, DatabaseService, ExampleService],     // <-- ต้องมี!
})
export class AppModule {}
