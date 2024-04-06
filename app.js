const express = require("express"),
      morgan= require("morgan"),
      photizoRouter=require("./routes/photizoRoute"),
      expressRateLimiter=require("express-rate-limit"),
      helmet=require("helmet"),
      xss=require("xss-clean"),
      sanitize=require("express-mongo-sanitize"),
      cors = require('cors'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      flash       = require('connect-flash'),
      bodyParser  = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
    secret: 'n0bFEermYgBlOs23Njk/y98W6A/T2PdRsz+MNFj3DpVVKcpF7tTyHVgnFfKbA8uV31YJDRoknyIhGwTp3J/pjA==',
    resave: false,
    saveUninitialized: false
  }));

  app.use(flash());

app.use((req,res,next)=>{
  res.locals.error=req.flash('error');
  res.locals.success=req.flash('success');
  next();
})

app.use(cors());

const allowedScriptSources = [
  "'self'",
  'https://code.jquery.com/',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/',
  "'unsafe-inline'"
];

const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    mediaSrc: ["'self'", 'https://www.youtube.com/'],
    imgSrc: ["'self'", 'data:', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/'],
    scriptSrc: allowedScriptSources
  }
};

app.use(helmet.contentSecurityPolicy(cspConfig));
app.set('trust proxy', 1); // Adjust the value based on the number of proxies


app.disable('x-powered-by');

let limiter=expressRateLimiter({
    max: 500,
    windowMs: 60 * 60 * 1000,
    message: 'we have received too many request from this IP.please try again later in about one hour time.',
    ignoreHeaders: ['X-Forwarded-For']
})

app.use('/photizo', limiter);

app.use(express.json());

app.use(sanitize());

app.use(xss());

app.use(morgan("dev"));

app.use(cookieParser()); 

//*******************************middle-wares**********************************
// Set the view engine
app.set("view engine","ejs");

//app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/assets'));

app.use(express.static(__dirname + '/stylesheets'));

app.use(express.static(__dirname + '/img'));

app.use(express.static(__dirname + '/customJS'));

//********************movie router middleware**********************************
app.get("/",(req,res)=>{
  res.redirect("/photizo");
})
app.use("/photizo", photizoRouter); 

//***************************default home route *******************************
/* app.get('/', (req, res) => {
  res.redirect('/photizo');
}); */

//***********************Define route to handle undefined routes (404 Not Found)*********
app.get('*', (req, res) => {
  res.render("notFoundPage")
});
app.all((req, res) => {
  res.status(error.statusCode || 500).send({
    status: error.status || 'Internal Server Error',
    message: error.message || 'Something went wrong',
    stackTrace: error.stack,
    error
  });});

module.exports=app;