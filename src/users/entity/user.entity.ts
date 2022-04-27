import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phon: string;

  @Prop({ required: true })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);

// ** entity sin schema
// export interface UsersEntity {
//   id: string;
//   name: string;
//   email: string;
//   phon: string;
//   address: string;
// }
