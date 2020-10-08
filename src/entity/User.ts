import { Field, ObjectType } from 'type-graphql';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm';
import { Recipe } from './Recipe';

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;
    @Field()
    @Column()
    name!: string;
    @Field()
    @Column()
    email!: string;
    @Field()
    @Column()
    password!: string;
    @OneToMany(() => Recipe, recipe => recipe.user)
    recipe!: Promise<Recipe[]>;
}