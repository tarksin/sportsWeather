const express = require('express'),
      hbs     = require('hbs'),
      fs      = require('fs');   ;

const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) =>{
   // console.log('10 inside some middleware');
    var now = new Date().toString();
    let datum = `${now} :  ${req.method} : ${req.url}\n`;
    fs.appendFile('maxxlog.log', datum , (err)=>{
        if (err) {console.log('unable to append to log file: ' + err);}
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
//     console.log('next() is never called.');
// });

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

//====================================ROUTES

app.get('/', (req, res) => {
    let objThing = {pageTitle: 'maxxima software HOME', welcome: "Welcome to maxxima software",
                    delta: ['bear','orangutan','meerkat','elephant','prairie chicken']};
    res.render('home', {objThing}, );
});

app.get('/about', (req, res) => {
    let objThing = {pageTitle: "maxxima software ABOUT", alpha:'AA', title:'About maxxima software',
        beta:'BB', gamma:[3,4,5], delta: ['bear','orangutan','meerkat','elephant','prairie chicken']};
    res.render('about', {objThing});
});

app.get('/bad', (req, res) => {
    let objError = {name: "Error object", msg: "There was an error"};
    res.send(objError);
});

app.listen(port, () => {
    console.log(`callback in app.listen(): server is running on ${port}`);
});
