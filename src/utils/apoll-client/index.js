import ApolloClient from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient( {
	link: new BatchHttpLink( {} ),
	cache: new InMemoryCache(),
} );
