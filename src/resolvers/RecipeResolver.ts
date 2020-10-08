import { resolve } from "path";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../entity/Recipe";
import { IsAuth } from "../middleware/IsAuth";
import { MyContext } from "../types/MyContext";

@InputType()
class RecipeInput {
    @Field()
    name!: string
    @Field()
    description!: string
    @Field()
    ingredients!: string
    @Field()
    userId!: number
    @Field()
    categoryId!: number
}

@Resolver()
export class RecipeResolver {
    @Mutation(() => Boolean) 
    async createRecipe(
        @Arg("variables") variables: RecipeInput
    ) {
        await Recipe.create(variables).save();
        return true;
    }

    @Mutation(() => Boolean) 
    async updateRecipe(
        @Arg("id") id: number,
        @Arg("fields",() => RecipeInput) fields: RecipeInput
    ) {
        await Recipe.update({id}, fields);
        return true;
    }

    @Mutation(() => Boolean) 
    async deleteRecipe(@Arg("id") id: number) {
        await Recipe.delete({id});
        return true;
    }

    @Query(() => [Recipe])
    @UseMiddleware(IsAuth)
    async getRecipes() {
        return await Recipe.find()
    }

    @Query(() => [Recipe])
    @UseMiddleware(IsAuth)
    async getOneRecipe(@Arg("name", { nullable: true }) name: string, @Arg("description", { nullable: true }) description: string, @Arg("ingredients", { nullable: true }) ingredients: string) {
        return await Recipe.find({ where: [{name},{description},{ingredients}]});
    }

    @Query(() => [Recipe])
    @UseMiddleware(IsAuth)
    async getMyRecipes(@Ctx() {payload}: MyContext) {
        return await Recipe.find({ where: {userId: payload?.userId}});
    }

}