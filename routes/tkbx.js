var express = require('express');
var router = express.Router();

var sessionId;


/* STEP 1

Require TB client and initalize it

*/

const createSession = onSessionCreated => {
  /* STEP 2

  Generate session and update the property sessionId. Then call 'onSessionCreated()' method.
        "...sessionId = 123453;"
        "...onSessionCreated();"

  */
};

router.post('/session/', function(req, res, next) {
  var onSessionCreated = () => {
    res.json({ sessionId: sessionId });
  };

  if (!sessionId) {
    createSession(onSessionCreated);
  } else {
    onSessionCreated();
  }
});

router.post('/user/', function(req, res, next) {
  /* STEP 3

  Create oken and return to client
        
  */
  const token = 'COMPLETE HERE';
  res.json({ token });
});

module.exports = router;
