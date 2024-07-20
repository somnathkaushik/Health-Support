const express = require("express");
const app = express();
const bodyP = require("body-parser");
const mongoose = require('mongoose');
// const cors = require('cors')
const options = { static: true };
compiler.init(options);



// mongoose.connect('mongodb+srv://somnath:CBpassword123@cluster0.yrz7unj.mongodb.net/blogs',{family:4}).then(()=> console.log('Connected to DB')).catch((err) => console.log('error conecting ', err.message));

mongoose.connect('mongodb+srv://somnath:somnath@cluster0.5y9meom.mongodb.net/HealthSupport', {family: 4}).then(()=> console.log('Connected to DB')).catch((err) => console.log('error conecting ', err.message));


app.use(bodyP.json());
// app.use(cors());


const path = require('path');
// Serve static assets
app.use('/public' , express.static(path.join(__dirname, 'public')));
app.use('/Frontend', express.static(path.join(__dirname, 'Frontend')));
app.use('/Home', express.static(path.join(__dirname, 'Frontend', 'Home')));
app.use('/Components', express.static(path.join(__dirname, 'Frontend', 'Components')));
app.use('/Contact', express.static(path.join(__dirname, 'Frontend', 'Contact')));
app.use('/Resources', express.static(path.join(__dirname, 'Frontend', 'Resources')));
app.use('/Courses', express.static(path.join(__dirname, 'Frontend', 'Courses')));
app.use('/Resource_Pdfs', express.static(path.join(__dirname, 'Frontend', 'Resource_Pdfs')));
app.use('/Images', express.static(path.join(__dirname, 'Frontend', 'Images')));
app.use('/output.css', express.static(path.join(__dirname, 'Frontend', 'output.css')));
app.use('/tailwind.config.js', express.static(path.join(__dirname, 'tailwind.config.js')));

// Route Handlers
app.get('/', function (req, res) {
    compiler.flush(function () {
        console.log('deleted');
    });
    res.sendFile(path.join(__dirname, 'Frontend', 'Home', 'index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'Contact.html'));
});

// Error Handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});




app.listen(8000,()=>{console.log("http://127.0.0.1:8000")});
