import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
