import path from 'path'
import express from 'express'
import hbs from 'hbs'

import {forecast} from "./utils/forecast.js";
import {geocode} from "./utils/geocode.js";


const app = express();
const __dirname = path.resolve();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//hbs setup engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide address'
        })
        return;
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            res.send({error});
            return;
        }
        forecast(longitude, latitude, (error, response) => {
            if (error) {
                res.send({error});
                return;
            }
            res.send({
                address: req.query.address,
                forecast: response,
                location: location
            })
        })
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dimo'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dimo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Dimo',
        helpText: 'Help??'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dimo',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dimo',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Running on 3000')
})
