import { Controller, Get } from '@nestjs/common';

@Controller('proposal-price')
export class ProposalPriceController {

    @Get()
    getTodos(){
        return[1,2,3]
    }
}

