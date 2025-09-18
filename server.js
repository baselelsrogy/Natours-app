const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(process.env.DATABASE);
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log(process.env.DATABASE, 'DB connention successful'));
// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
