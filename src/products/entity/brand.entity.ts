import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brands extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brands);
