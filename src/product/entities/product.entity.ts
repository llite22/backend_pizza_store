import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientEntity } from '../../ingredient/entities/ingredient.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: false, nullable: true })
  isConfigurable: boolean;

  @Column({ nullable: true })
  category_id: number;

  @ManyToMany(() => IngredientEntity, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'product_ingredients',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ingredient_id',
      referencedColumnName: 'id',
    },
  })
  ingredients: IngredientEntity[];

  @ManyToOne(() => CategoryEntity, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category?: CategoryEntity;
}
