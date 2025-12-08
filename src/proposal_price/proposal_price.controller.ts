import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProposalPriceService } from './proposal_price.service';
import { ProposalPriceAddDto } from './proposal_price.dto';


@Controller('proposal-price')
export class ProposalPriceController {

constructor(private readonly proposalPriceService: ProposalPriceService) {}

    @Get()
    async getproposalShow() {
       return this.proposalPriceService.getproposal()
    }
    
  @Post()
  async postProposalPriceAdd(@Body() proposalPriceAddDto: ProposalPriceAddDto) {
    return await this.proposalPriceService.postProposalPrice(proposalPriceAddDto);
  }

  
  
}

