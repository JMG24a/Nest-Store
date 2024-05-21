import { Product } from './products.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';


@Entity({name: 'categories'})
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text'})
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updateAt: Date;

  @ManyToMany(() => Product, (product) => product.category)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {name: 'product_id'},
    inverseJoinColumn: {name: 'category_id'}
  })
  product: Product[];
}
