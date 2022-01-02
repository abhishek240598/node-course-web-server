const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFileSync('server.log', log + '\n');  
    next();
});

hbs.registerHelper('currentYear', () => {
   return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website! Really good experience here'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'Projects Page',
        message: 'Portfolio listed here'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});                           