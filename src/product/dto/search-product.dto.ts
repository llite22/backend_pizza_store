import { IsOptional, IsString } from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  ingredients_ids: string;

  @IsString()
  @IsOptional()
  isConfigurable: string;

  @IsString()
  @IsOptional()
  take: string;

  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  orderBy: 'price' | 'name' | '-price' | '-name';
}
