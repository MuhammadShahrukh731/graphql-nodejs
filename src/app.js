const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { authenticate } = require('./utils/auth');
require('dotenv').config();

const startServer = async () => {
  const app = express();

  app.use(async (req, _, next) => {
    try {
      await authenticate(req);
      next();
    } catch (error) {
      next();
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({ app });

  return app;
};

module.exports = startServer;
