var express = require('express');
var router = express.Router();


var  apiKey = '46688592';
const apiSecret = 'af3d6b6c800d665f6a56f8e36474a5714f59220c';
/* STEP 1 : Require TB client and initalize it */
var OpenTok = require('opentok'),
    opentok = new OpenTok(apiKey, apiSecret);



router.post('/session/', function(req, res, next) {
  if (!session) {
    opentok.createSession(function(err, session) {
      if (err) return console.log(err);
        sessionId = session.sessionId;
        console.log(session)
      });

    res.json({ currentsessionId: sessionId });
  } else {

    res.json({ currentsessionId: sessionId });
  }
});

router.post('/user/', function(req, res, next) {
  /* STEP 3
  Create token and return to client  
  const token = 'COMPLETE HERE';
  */
  const token = session.generateToken({
    role :                   'publisher',
    expireTime :             (new Date().getTime() / 1000)+(1 * 60 * 60), // 1 day
    data :                   'name=Johnny',
    initialLayoutClassList : ['focus']
  });

  console.log(token)

  if (token) {
    res.json({ token });
  } else {
    console.log(" Error occurred when generating token using session Id")
    res.json({ token })
  }
});

module.exports = router;
