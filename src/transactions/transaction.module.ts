import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transactions, TransactionSchema } from "./schema/transaction.schema";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transactions.controller";

@Module({
    imports:[MongooseModule.forFeature([{name: Transactions.name, schema: TransactionSchema}])],
    providers:[TransactionService],
    controllers:[TransactionController]
})

export class TransactionModule {}