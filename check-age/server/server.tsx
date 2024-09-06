import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { name, password } = req.body;

  //Authentication
  if (name === 'john_doe' && password === 'secret_password') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});