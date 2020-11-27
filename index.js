const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');
const images = './uploads';

const app = express();

//app middleware
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb',extended:true}));
app.use(cors());


//static image server
app.use(express.static(images));

//ApolloServer definition
const server = new ApolloServer({ typeDefs, resolvers });

//express server as middleware
server.applyMiddleware({app});

//Launch a web server.
app.listen({ port:4000 }, () => 
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`));
