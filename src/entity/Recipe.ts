import { Field, ObjectType } from 'type-graphql';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn, PrimaryColumn} from 'typeorm';
import {Category} from './Category';
import { User } from './User';

@ObjectType()
@Entity()
export class Recipe extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    @Field()
    @Column()
    name!: string;
    @Field()
    @Column()
    description!: string;
    @Field()
    @Column()
    ingredients!: string;
    
    @PrimaryColumn()
    userId!: number;
    
    @PrimaryColumn()
    categoryId!: number;

    @ManyToOne(() => User, user => user.recipe, {primary: true})
    @JoinColumn({name: "userId"})
    user!: Promise<User>;

    @ManyToOne(() =>  Category, category => category.recipe, {primary: true})
    @JoinColumn({name: "categoryId"})
    category!: Promise<Category>;
}   