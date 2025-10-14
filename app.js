const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const viewRouter = require('./routes/viewRouter');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSnitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
// serving static files
app.use(express.static(path.join(__dirname, 'public')));
// set security http headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://unpkg.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com', 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'https://res.cloudinary.com',
          'https://unpkg.com',
          'https://a.tile.openstreetmap.org',
          'https://b.tile.openstreetmap.org',
          'https://c.tile.openstreetmap.org',
        ],
        connectSrc: ["'self'", 'https://unpkg.com'],
      },
    },
  })
);

// Development loging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit request from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// body parser reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against noSQL query injectior
app.use(mongoSnitize());

// Data sanitization against XSS
app.use(xssClean());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'],
  })
);

// test middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Error Handling
app.all('*', (req, res, next) => {
  const mainError = new AppError(`Can't find ${req.originalUrl} on this server!`);
  next(mainError);
});

app.use(globalErrorHandler);

module.exports = app;
