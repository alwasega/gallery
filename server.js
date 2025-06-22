const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// connecting the database
let mongodb_url = process.env.MONGODB_URI || config.mongoURI.development;
console.log('Connecting to MongoDB...');

mongoose.connect(mongodb_url,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.log('Database connection error:', err);
});

// test if the database has connected successfully
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Database connected successfully')
})

db.on('error', (err) => {
    console.log('Database error:', err);
});

// Initializing the app
const app = express();


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/', index);
app.use('/image', image);



 
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Server is accessible at http://0.0.0.0:${PORT}`);
});