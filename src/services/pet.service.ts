import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { applyPatch } from 'rfc6902';
import { Pet, PetDocument } from 'src/schemas/pet.schema';
import { Entity, JSONPatch } from '../types';

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async findAll(
    query: any,
    page: number,
    limit: number,
    count: boolean,
  ): Promise<Entity<Pet>> {
    const petsData: Pet[] = await this.petModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    if (!petsData)
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'No pets found');

    if (!count) return { values: petsData };

    const countDocs: number = await this.petModel
      .countDocuments(query)
      .then((count) => count)
      .catch((err) => {
        throw Error(err);
      });

    return { values: petsData, count: countDocs };
  }

  async find(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).exec();

    if (!pet) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no pet with that id',
      );
    }

    return pet;
  }

  async delete(id: ObjectId): Promise<Pet> {
    const pet = await this.petModel.findOneAndRemove({ _id: id }).exec();

    if (!pet) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, "Can't delete pet");
    }
    return pet;
  }

  async create(petDto: Pet): Promise<Pet> {
    const createdPet = new this.petModel(petDto);
    if (!createdPet)
      throw new ConflictException(HttpStatus.CONFLICT, 'Cannot save pet');

    return createdPet.save();
  }

  async update(patch: JSONPatch, petId: ObjectId) {
    const petToUpdate = await this.petModel.findById(petId).exec();

    if (!petToUpdate) {
      throw new NotFoundException(
        HttpStatus.NOT_FOUND,
        'There is no pet with that id',
      );
    }

    const petDtoUpdated = applyPatch(petToUpdate, patch as any);

    if (petDtoUpdated.filter((element) => !!element).length) {
      throw new Error(
        `Cannot patch: ${petDtoUpdated
          .map((error) => `${error.name}: ${error.message}`)
          .join(',')}`,
      );
    }
    return petToUpdate.save();
  }
}
