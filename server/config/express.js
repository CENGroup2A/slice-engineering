const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    ordersRouter = require('../routes/orders.server.routes'),
    passport = require('passport'),
    accountRouter = require('../routes/account.server.routes'),
    uploadRouter = require('../routes/S3upload.server.routes');
    User = require('../models/user.server.model')
    ordersRouter = require('../routes/order.server.routes')
    session = require('express-session');
    materialsRouter = require('../routes/Materials.server.routes');
    PriceRouter = require('../routes/Price.server.routes');
    CartitemRouter = require('../routes/Cartitem.server.routes');

module.exports.init = () => {
    /*
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    app.use(session({secret:'ntk7',
                     resave: true,
                     saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());



    // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // add a router
    app.use('/api/orders', ordersRouter);
    app.use('/api/', accountRouter);
    app.use('/api', materialsRouter);
    app.use('/api', PriceRouter);
    app.use('/api',CartitemRouter);
    //app.use('/api',CartIDRouter);
    //app.use('/api',CheckoutRouter)
    app.use('/api/', uploadRouter);
    app.use('/api/', ordersRouter)

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}
