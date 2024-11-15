import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  create(dto: CreateProductDto) {
    return this.repository.save({
      name: dto.name,
      price: dto.price,
      category: { id: dto.category_id },
      ingredients: dto.ingredients_ids.map((id) => ({ id })),
    });
  }

  async search(dto: SearchProductDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.leftJoinAndSelect('p.ingredients', 'ingredients');

    if (dto.name) {
      qb.andWhere('p.name ILIKE :name', { name: `%${dto.name}%` });
    }

    if (dto.category_id) {
      qb.andWhere('p.category.id = :category_id', {
        category_id: dto.category_id,
      });
    }

    if (dto.price) {
      const [minPrice, maxPrice] = dto.price.split(',');
      qb.andWhere('p.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    }

    if (dto.ingredients_ids) {
      const ingredients_ids = dto.ingredients_ids.split(',').map(Number);
      qb.andWhere('ingredients.id IN (:...ingredients_ids)', {
        ingredients_ids,
      });
    }

    if (dto.isConfigurable !== undefined) {
      qb.andWhere('p.isConfigurable = :isConfigurable', {
        isConfigurable: dto.isConfigurable,
      });
    }

    if (dto.orderBy) {
      qb.orderBy(
        `p.${dto.orderBy.replace('-', '')}`,
        dto.orderBy.includes('-') ? 'ASC' : 'DESC',
      );
    } else {
      qb.orderBy('p.name', 'DESC');
    }

    const take = +dto.take || 10;
    const page = +dto.page || 0;

    qb.take(take);
    qb.skip(page === 1 ? 0 : page * take);

    const [items, count] = await qb.getManyAndCount();

    return {
      items,
      count,
    };
  }

  findAll() {
    return this.repository.find({ relations: ['ingredients'] });
  }

  findOne(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  update(id: number, dto: UpdateProductDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
