import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cards } from "./schema/cards.schema";
import { Model } from "mongoose";
import { CardsDto } from "./dto/cards.dto";

@Injectable()
export class CardServices {
    constructor(@InjectModel(Cards.name) private cardsModel: Model<Cards>) {}
    
    async getCardsList () {
        const list = await this.cardsModel.find();
        return list
    }

    async getSingleDetail (id: string) {
        const singleRecord = await this.cardsModel.findById(id);
        return singleRecord
    }

    async createCardDetail (cardsDetails: CardsDto) {
        if(!cardsDetails) {
            throw new BadRequestException('please enter some card details')
        }
        try {
            const newCard = await this.cardsModel.create(cardsDetails);
            return newCard.save();
        } catch (error) {
            throw new BadRequestException('unable to create a card')
        }
    }

    async partialUpdateCards (id: string, updateCardDetails: CardsDto) {
        if(!updateCardDetails) {
            throw new BadRequestException('there should be single entry any field')
        }
        try {
            const partialUpdate = await this.cardsModel.findByIdAndUpdate(id, updateCardDetails, {new: true, runValidators: true});
            return partialUpdate;
        } catch (error) {
            throw new BadRequestException('unable to update the card details')
        }
    }

    async deleteCard (id: string) {
        const deleteCardsDetails = await this.cardsModel.findByIdAndDelete(id);
        if(!deleteCardsDetails) {
            throw new BadRequestException('unable to delete the card')
        }
        return {message: 'card deleted successfully'}
    }
}