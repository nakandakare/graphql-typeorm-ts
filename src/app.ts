import express from 'express';
import {ApolloServer} from 'apollo-server-express';

const app = express();

const server = new ApolloServer({

})

server.applyMiddleware({app, path: '/graphql'});