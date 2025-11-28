import { Module } from '@nestjs/common';
import { ProposalPriceController } from './proposal_price.controller';
import { ProposalPriceService } from './proposal_price.service';

@Module({
  controllers: [ProposalPriceController],
  providers: [ProposalPriceService]
})
export class ProposalPriceModule {}
