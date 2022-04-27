import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categories extends Document {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Categories);
