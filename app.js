require('dotenv').config();
const express=require('express');
const app=express();
const expressLayout=require('express-ejs-layouts');
const PORT=4000 ||process.env.PORT;
const connectDB=require('./server/config/db');
connectDB();

//USING STYLES 
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//USING THE HOME ROUTE
app.use('/',require('./server/routes/main'))

//LISTENING THE APP
app.listen(PORT,()=>{
  console.log("Server is started");
});

