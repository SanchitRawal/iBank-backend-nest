import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BeneficiariesController } from "./beneficiaries.controller";
import { Beneficiaries, BeneficiariesSchema } from "./schema/beneficiaries.schema";
import { BeneficiariesService } from "./beneficiaries.service";

@Module({
    imports:[MongooseModule.forFeature([{name: Beneficiaries.name, schema: BeneficiariesSchema}])],
    providers: [BeneficiariesService],
    controllers: [BeneficiariesController]
})

export class BeneficiariesModule {}