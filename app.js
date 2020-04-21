var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const port = process.env.PORT || 3000;

var indexRouter = require('./routes/index');
var tokboxRouter = require('./routes/tkbx');
var eventRouter = require('./routes/event');

var app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tkbx', tokboxRouter);
app.use('/event', eventRouter);


var  apiKey = '46688592';
const apiSecret = 'af3d6b6c800d665f6a56f8e36474a5714f59220c';
var OpenTok = require('opentok'),
    opentok = new OpenTok(apiKey, apiSecret);

app.post('/session', function(req, res, next) {
    var sessionId = "";

    opentok.createSession(function(err, session) {
    if (err) return console.log(err);
        sessionId = session.sessionId;
        console.log(session)
    });

    /* STEP 3  Create token and return to client  */
    const token = session.generateToken({
        role :                   'publisher',
        expireTime :             (new Date().getTime() / 1000)+(1 * 60 * 60), // 1 day
        data :                   'name=Johnny',
        initialLayoutClassList : ['focus']
    });

    console.log(token)

    if (token) {
        res.json({ currentToken: token, currentsessionId: sessionId, apiKey:  apiKey });
    } else {
        console.log(" Error occurred when generating token using session Id")
        res.json({ currentToken: "", currentsessionId: ""  })
    }
  });

app.listen(port, () => console.log(`Listening on port ${port}`));

