import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Min,
  IsOptional,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDTO } from './categories.dto';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDTO;

  @IsMongoId()
  readonly brand: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice: number;

  @IsOptional()
  @IsPositive()
  maxPrice: number;
}
