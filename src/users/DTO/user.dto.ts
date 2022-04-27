import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsPhoneNumber()
  readonly phon: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;
}

export class updateUserDTO extends PartialType(createUserDTO) {}

// import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';

// export class createUserDTO {
//   @IsString()
//   @IsNotEmpty()
//   readonly name: string;

//   @IsEmail()
//   readonly email: string;

//   @IsString()
//   @IsPhoneNumber()
//   readonly phon: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly address: string;
// }

// export class updateUserDTO extends PartialType(createUserDTO) {}
