import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { BeneficiariesDto } from './dto/beneficiaries.dto';

@Controller('beneficiaries')
export class BeneficiariesController {
    constructor(private readonly bensefieriesService: BeneficiariesService) {}
    
    @Get()
    async getAllBeneficiaries () {
        return this.bensefieriesService.getList()
    }

    @Get(':id')
    async getSingleRecord(@Param('id') id:string) {
        return this.bensefieriesService.getSingleRecord(id);
    }

    @Post()
    async createBeneficiary (@Body() beneficiariesDetails: BeneficiariesDto) {
        return this.bensefieriesService.createBeneficiaries(beneficiariesDetails);
    }

    @Patch(':id')
    async partialUpdateBeneficiary (@Param('id') id:string, @Body() beneficiariesDetails: BeneficiariesDto) {
        return this.bensefieriesService.partialUpdate(id, beneficiariesDetails)
    }

    @Delete(':id') 
    async deleteRecord (@Param('id') id:string) {
        return this.bensefieriesService.deleteRecord(id);
    }
}
