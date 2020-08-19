let express = require('express'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser');
var firebase = require('firebase-admin');
var key = require('./key.json');

firebase.initializeApp({
    credential : firebase.credential.cert(key),
    databaseURL : "https://todoapp-38cf9.firebaseio.com"
})
var db = firebase.database();
var ref = db.ref('Todo');
var apis = require('./routes/apis')(ref)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'docs')));
app.use('/', express.static(path.join(__dirname, 'docs')));
app.use('/api', apis)

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});
 
app.use(function (err, req, res, next) {
   console.error(err.message); // Log error message in our server's console
   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});