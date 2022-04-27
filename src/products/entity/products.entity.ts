import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brands } from '../entity/brand.entity';

@Schema()
export class Products extends Document {
  @Prop({ required: false })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number, index: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  image: string;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brands.name })
  brand: Brands | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
ProductSchema.index({ price: 1, stock: -1 }); //index sirve para dar mas velocidad a esas consultas

// ** entity basic
// export class Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   image: string;
// }
