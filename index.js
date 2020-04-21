


var express = require('express');

const port = process.env.PORT || 3000;

var app = express();

// This value can be stored in an ecrypted place like Azure Key Vault.
var  apiKey = '46688592';
const apiSecret = 'af3d6b6c800d665f6a56f8e36474a5714f59220c';

var OpenTok = require('opentok'),
    opentok = new OpenTok(apiKey, apiSecret);


// Set up webhook endpoint for front end to call! 
// Creates a new session when called! Front end needs to check if there's an existing sessionId. T
// This can be done through cookies encryption, react context or redux state management
app.get('/session', function(req, res, next) {
    var sessionId = "";
    var token = " "
    // Create a session
    opentok.createSession(function(err, session) {
    if (err) return console.log(err);
        sessionId = session.sessionId;

        //session.generateToken() needs to be inside of opentok! Initializing it as a new obj throws in an error
        token = session.generateToken({
          role :                   'publisher',
          expireTime :             (new Date().getTime() / 1000)+(1 * 60 * 60), // 1 day
          data :                   'name=Johnny',
          initialLayoutClassList : ['focus']
        });

      /* Create token and return all required values to client  */
      if (token) {
        res.json({ currentToken: token, currentSessionId: sessionId, apiKey:  apiKey });
      } else {
          console.log(" Error occurred when generating token using session Id")
          res.json({ currentToken: "", currentsessionId: ""  })
      }
    });
  });

app.get("/", (req, res) => res.send("Hello World!"));
  
app.listen(port, () => console.log(`Listening on port ${port}`));

