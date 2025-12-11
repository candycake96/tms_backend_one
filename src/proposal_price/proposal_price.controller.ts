import { Body, Controller, Get, Post, Param  } from '@nestjs/common';
import { ProposalPriceService } from './proposal_price.service';
import { ProposalPriceAddDto, ProposalPriceEditDto } from './proposal_price.dto';


@Controller('proposal-price')
export class ProposalPriceController {

  constructor(private readonly proposalPriceService: ProposalPriceService) { }

  @Get()
  async getproposalShow() {
    return this.proposalPriceService.getproposal()
  }

  @Get('get/:id')
  async getproposalShowID(@Param('id') id: string) {
    return this.proposalPriceService.getproposal_id(id);
  }


  @Post()
  async postProposalPriceAdd(@Body() proposalPriceAddDto: ProposalPriceAddDto) {
    return await this.proposalPriceService.postProposalPrice(proposalPriceAddDto);
  }


  @Post('update')
  async postProposalUpdate(@Body() proposalPriceEditDto: ProposalPriceEditDto) {
    return await this.proposalPriceService.postproposalUpdate(proposalPriceEditDto);
  }

}

