import { Field, ObjectType } from 'type-graphql';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity} from 'typeorm';
import {Recipe} from './Recipe';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    @Field()
    @Column()
    name!: string;
 
    @OneToMany(() => Recipe, recipe => recipe.category)
    recipe!: Recipe[];
}