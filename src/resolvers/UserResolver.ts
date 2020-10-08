import { format } from "path";
import {Resolver, Query, Mutation, Arg, Ctx, UseMiddleware} from 'type-graphql';
import * as bcrypt from "bcryptjs";
import {User} from '../entity/User';
import {sign} from 'jsonwebtoken';
import { MyContext } from "../types/MyContext";
import { IsAuth } from "../middleware/IsAuth";

@Resolver()
export class UserResolver {
    @Mutation(() => Boolean)
    async signUp(
        @Arg("name") name: string,
        @Arg("password") password: string,
        @Arg("email") email: string
    ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.insert({name, email, password: hashedPassword})
        return true;
    }

    @Mutation(() => Boolean)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ) {
        const user = await User.findOne({where: {email}});
        
        if(!user){
            return null;
        }

        const valid = await bcrypt.compare(password, user.password)

        if(!valid) {
            return null;
        }   

        const accessToken = sign({ userId: user.id }, 'secret')

        ctx.res.cookie('authorization', accessToken);
        return true;
    }
    
    @Query(() => String)
    @UseMiddleware(IsAuth)
    authenticationTest(): string {
        return "Authentication success";
    }
}