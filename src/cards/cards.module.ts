import { Module } from "@nestjs/common";
import { CardServices } from "./cards.service";
import { CardsController } from "./cards.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cards, CardsSchema } from "./schema/cards.schema";
import { Accounts, AccountSchema } from "src/accounts/schemas/account.schema";

@Module({
    imports:[MongooseModule.forFeature([
        {name: Cards.name, schema: CardsSchema},
    {name: Accounts.name, schema: AccountSchema}])],
    providers:[CardServices],
    controllers:[CardsController]
})

export class CardsModule {}