import express from 'express';

const app   = express();
const port  = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Botcode explorer API is running smoothly!'));

app.listen(port, () => {
  console.log(`⚡️[server]: API is running at http://localhost:${port}`);
});