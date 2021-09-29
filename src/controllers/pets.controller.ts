import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Pet } from 'src/schemas/pet.schema';
import { PetService } from 'src/services/pet.service';

@Controller('/pets')
@UseGuards(JwtAuthGuard)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getPets(@Query() query: any) {
    const dbQuery: any = {};
    const page: number = parseInt(query.page) || 1;
    const limit: number = parseInt(query.limit) || 10;
    const count: boolean = query.count || false;

    if (query.owner && isValidObjectId(query.owner)) {
      dbQuery.owner = query.owner;
    }

    return this.petService.findAll(dbQuery, page, limit, count);
  }

  @Post()
  async postPet(@Body() petData: Pet): Promise<Pet> {
    if (!petData.name) {
      throw new ConflictException(HttpStatus.NO_CONTENT, 'no body content');
    } else {
      const clonedPet: Pet = JSON.parse(JSON.stringify(petData));
      return this.petService.create(clonedPet);
    }
  }
}
