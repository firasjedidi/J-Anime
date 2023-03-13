// npm install @apollo/server express graphql cors body-parser
const  { ApolloServer } =require('@apollo/server') ;
const  { expressMiddleware } =require('@apollo/server/express4') ;
const  { ApolloServerPluginDrainHttpServer } =require('@apollo/server/plugin/drainHttpServer') ;
const  express =require('express') ;
const  http =require('http') ;
const  cors =require('cors') ;
const  bodyParser =require('body-parser') ;
const  typeDefs =require('./GraphQL/schema') 
const  resolvers =require( './GraphQL/resolvers') 
const  mongoose =require('mongoose') ;
const { graphqlHTTP } = require("express-graphql");
async function initServer(){
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);
  mongoose.connect('mongodb://localhost:27017/J-Anime', { useNewUrlParser: true });
  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();
  app.use(
    '/',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
  
}
initServer()
// const { ApolloServer } = require('apollo-server-express');
// const mongoose = require('mongoose');
// const typeDefs = require('./GraphQL/schema');
// const resolvers = require('./GraphQL/resolvers');
// const express = require('express');
// const app = express();
// const cors = require('cors')
// mongoose.connect('mongodb://localhost:27017/J-Anime', { useNewUrlParser: true });

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.start().then(res => {
//   server.applyMiddleware({ app, path: '/' });
//   app.listen(4000, () => 
//     console.log(`Gateway API running at port: ${4000}${server.graphqlPath}`)
//   );  
// });