import { IsOptional, IsPositive, IsString, Min, ValidateIf } from 'class-validator';

export class OptionsFilter {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;

  @IsOptional()
  @IsString()
  role: string;
}
