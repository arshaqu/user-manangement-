const express = require('express');
const { engine: exphbs } = require('express-handlebars');
const bodyParser = require('body-parser')
const mysql = require('mysql')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended:false }));

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs',exphbs( {extname: '.hbs'}));
app.set('view engine','hbs')


// Connection Pool 
const pool = mysql.createPool({
    connectionLimit :100,
    host            :process.env.DB_HOST,
    user            :process.env.DB_USER,
    password        :process.env.DB_PASS,
    database        :process.env.DB_NAME
});


// Connect to DB
pool.getConnection((err,connection)=>{
    if(err) throw err; 
    console.log('Connect as ID ' +connection.threadId);
});

const routes = require('./server/routes/user')
app.use('/',routes)


app.listen(port ,() => console.log(`Listening the port ${port}`))