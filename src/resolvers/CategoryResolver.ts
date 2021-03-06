import { Arg, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../entity/Category";
import { IsAuth } from "../middleware/IsAuth";

@InputType()
class CategoryInput {
    @Field()
    name!: string
}

@Resolver()
export class CategoryResolver {
    @Mutation(() => Boolean) 
    async createCategory(
        @Arg("variables") variables: CategoryInput,  
    ) {
        await Category.create(variables).save();
        return true;
    }

    @Mutation(() => Boolean) 
    async updateCategory(
        @Arg("id") id: number,
        @Arg("fields",() => CategoryInput) fields: CategoryInput
    ) {
        await Category.update({id}, fields);
        return true;
    }

    @Mutation(() => Boolean) 
    async deleteCategory(@Arg("id") id: number) {
        await Category.delete({id});
        return true;
    }

    @Query(() => [Category])
    @UseMiddleware(IsAuth)
    async getCategory() {
        return await Category.find()
    }

    @Query(() => [Category])
    @UseMiddleware(IsAuth)
    async getOneCategory(@Arg("name") name: string) {
        return await Category.find({ where: {name}});
    }
}