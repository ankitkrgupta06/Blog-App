require('dotenv').config();
const express=require('express');
const app=express();
const expressLayout=require('express-ejs-layouts');
const methodOverride=require('method-override');
const PORT=process.env.PORT||4000;
const connectDB=require('./server/config/db');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const {MongoStore}=require("connect-mongo");
const {isActiveRoute}=require('./server/helpers/routeHelper');

connectDB();

//USING STYLES 
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
const store=MongoStore.create({
    mongoUrl:process.env.MONGODB_URI
  })
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  store:store
}))

app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.locals.isActiveRoute=isActiveRoute;
//USING THE HOME ROUTE
app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))

//LISTENING THE APP
app.listen(PORT,()=>{
  console.log("Server is started");
});

