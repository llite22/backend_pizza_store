import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
