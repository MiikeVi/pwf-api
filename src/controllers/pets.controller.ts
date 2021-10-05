import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { isValidObjectId, ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Pet } from 'src/schemas/pet.schema';
import { PetService } from 'src/services/pet.service';
import { JSONPatch } from 'src/types';

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

  @Get(':id')
  getPetById(@Param() params: any) {
    if (!isValidObjectId(params.id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }

    const dbQuery: any = { _id: params.id };

    return this.petService.find(dbQuery);
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

  @Patch(':id')
  patchPet(
    @Body() petDataPatch: JSONPatch,
    @Param() params: any,
  ): Promise<Pet> {
    if (!isValidObjectId(params.id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }

    const dbQuery: any = { _id: params.id };
    return this.petService.update(petDataPatch, dbQuery);
  }

  @Delete(':id')
  removePet(@Param('id') id: ObjectId): Promise<Pet> {
    if (!isValidObjectId(id)) {
      throw new ConflictException(HttpStatus.CONFLICT, 'Id not valid');
    }
    return this.petService.delete(id);
  }
}
