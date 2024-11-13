import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientEntity } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientEntity)
    private repository: Repository<IngredientEntity>,
  ) {}

  create(dto: CreateIngredientDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  update(id: number, dto: UpdateIngredientDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
