const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/app-horas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require('./src/models/Apontamento/Apontamento');

app.use('/api', require('./src/routes'));

app.listen(port, () => console.log(`Listen on port ${port}`));
