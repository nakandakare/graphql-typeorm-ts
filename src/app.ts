import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {PingResolver} from './resolvers/ping';
import { buildSchema } from "type-graphql";
import {UserResolver} from './resolvers/UserResolver';
import {RecipeResolver} from './resolvers/RecipeResolver';
import {CategoryResolver} from './resolvers/CategoryResolver';
import cookieParser from 'cookie-parser';

export async function startServer() {
    const app = express();
    app.use(cookieParser());
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver, UserResolver, RecipeResolver, CategoryResolver]
        }),
        context: ({req, res}: any) => ({req, res})
    })
    
    server.applyMiddleware({app, path: '/graphql'});

    return app;
}