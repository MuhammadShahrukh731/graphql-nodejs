const startServer = require('./src/app');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const app = await startServer();
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server ready at http://localhost:${process.env.PORT || 4000}/graphql`)
    );
  })
  .catch((err) => console.error('Database connection failed:', err));
