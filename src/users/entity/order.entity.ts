import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Orders extends Document {

}

export const OrderSchema = SchemaFactory.createForClass(Orders)
