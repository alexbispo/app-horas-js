const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/app-horas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require('./src/models/Apontamento/Apontamento');

app.use('/api', require('./src/routes'));

app.listen(port, () => console.log(`Listen on port ${port}`));
