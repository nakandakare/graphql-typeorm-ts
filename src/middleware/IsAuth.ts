import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import {verify} from 'jsonwebtoken';

export const IsAuth: MiddlewareFn<MyContext> = async ({context}, next) => {
    //Set "request.credentials" to "include" in graphql.
    const token = context.req.cookies['authorization'];

    if(!token) {
        throw new Error("not authenticated");
    }
    try{
        const payload = verify(token, 'secret');
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error('not authenticated');
    }

    return next();
};