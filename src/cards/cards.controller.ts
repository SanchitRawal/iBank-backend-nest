import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CardServices } from "./cards.service";
import { CardsDto } from "./dto/cards.dto";

@Controller('cards')
export class CardsController {
    constructor(private readonly cardServices: CardServices) {}

    @Get() 
    async getCardsDetailsList () {
        const result = await this.cardServices.getCardsList();
        return result
    }

    @Get(':id')
    async getSingleCard (@Param('id') id: string) {
        const result = await this.cardServices.getSingleDetail(id);
        return result
    }

    @Post()
    async createNewCard (@Body() cardsDetails: CardsDto) {
        const result = await this.cardServices.createCardDetail(cardsDetails);
        return result
    }

    @Patch(':id') 
    async updatePartial (@Param('id') id:string, @Body() updateDetails: CardsDto) {
        const result = await this.cardServices.partialUpdateCards(id, updateDetails);
        return result
    }

    @Delete(':id')
    async deleteCard (@Param('id') id: string) {
        const deleteCard = await this.cardServices.deleteCard(id)
        
    }
}