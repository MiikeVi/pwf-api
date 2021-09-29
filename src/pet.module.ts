import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './controllers/pets.controller';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetService } from './services/pet.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
  ],
  exports: [PetService],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
