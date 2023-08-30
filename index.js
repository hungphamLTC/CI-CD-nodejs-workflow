require('dotenv').config({ path: 'config/config.env' });
const courses = require('./routes/courses')
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/courses', courses)

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
app.listen(port, () => console.log(`Listening on port ${port}`))

