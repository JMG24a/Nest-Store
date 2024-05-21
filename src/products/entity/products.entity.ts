import { Brand } from './brands.entity'
import { Category } from './categories.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn
} from 'typeorm';


@Entity({name: 'products'})
@Index(['price',])
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'int'})
  price: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'varchar'})
  image: string;

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

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id'})
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.product)
  category: Category[];
}
