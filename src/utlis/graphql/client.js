import { ApolloClient, InMemoryCache } from "@apollo/client";
// import {ApolloClient} from 'apollo-boost';
// const httpLink = new HttpLink({
//   uri: "http://192.168.1.19:4000/",
  
// })
export const client = new ApolloClient({
  uri:  "http://192.168.1.19:4000/",
  cache: new InMemoryCache(),
});
