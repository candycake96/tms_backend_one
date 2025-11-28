import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProposalPriceModule } from './proposal_price/proposal_price.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ProposalPriceModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],     // <-- ต้องมี!
})
export class AppModule {}
