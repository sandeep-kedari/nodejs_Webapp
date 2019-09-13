const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//app.com
//app.com/help
//app.com/about
//app.com/weather

//Adding Paths for Express config
const viewspath = path.join(__dirname,'../templates/views')
const publicDirFolder = path.join(__dirname,'../Public')
const partialpaths = path.join(__dirname,'../templates/partials')

//Setup Handlebar engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpaths)

//Seting up Statics directory to serve
app.use(express.static(publicDirFolder))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome Home..!!',
        Name: 'Sandeep Kedari'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title:'About Us..!!',
        Creater: 'Sandeep',
        About: 'Node Handler for hbs',
        Name: 'Sandeep Kedari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Needed ...!!',
        Name: 'Sandeep Kedari',
        Help: 'Send us an email for any Help Needed',
        Email: 'sandy86299@gmial.com'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Hello This is our first Express App  ...</h1>');
// })


// app.get('/help', (req, res)=> {
//     res.send({
//         Name: 'Sandeep Kedari',
//         Help: 'Would help you learn new things'
//     })
// }) 

// app.get('/about', (req, res) => {
//     res.send('<h2>This is Tutorial about Express on Udemy..!! </h2>');
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            Error: 'Query String Address is manadatory and must be provided'
        })
    } 
    const address = req.query.address;
    geocode(address, (error, {Latitude, Longitude, Location} = {}) => {  
        if(error) {
            return res.send({
                Error: error
            })
        }
        forecast(Latitude, Longitude, (err, forecast) => {
                if(err) {
                    return res.send({
                        Error: err
                    })
                }
                 res.send({
                    Address: req.query.address,
                    Forecast: forecast,
                    Location: Location
                })
            }) 
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        Name: 'Sandeep Kedari',
        error: 'Help Article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        Name: 'Sandeep Kedari',
        error: 'Page Not Found'
    })
})
// app.get('/help/*', (req, res) => {
//     res.send(' 404 Help Related Article not found ')
// })

// app.get('*', (req, res) => {
//     res.send('404 Page not Found');
// })

app.listen(3000, () => {
    console.log(' Server Started Successfully..!!')
});


