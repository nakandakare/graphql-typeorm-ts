import {Query, Resolver} from 'type-graphql';

//Una especie de consulta para testear la api de graphql
@Resolver()
export class PingResolver {
    @Query(() => String)
    ping() {
        return "Pong!"
    }
}