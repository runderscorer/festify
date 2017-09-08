const dotenv = require('dotenv');
dotenv.load();

const app = require('./app');
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});
