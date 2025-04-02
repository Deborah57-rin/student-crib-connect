const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/authRoute');
const propertyRouter = require('./routes/propertyRoute');
require("dotenv").config();


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:5500"],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}));

app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL).then(()=>console.log('Connected to database' ))
.catch((err)=>console.log('Error connecting to database', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get('/', (req, res) => {
    res.send('Hello from the server');
});





