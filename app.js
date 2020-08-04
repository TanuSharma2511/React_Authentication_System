const express = require('express');
  const path = require('path');
  const mongoose=require("mongoose");
  const bodyParser = require("body-parser");
  const passport = require("passport");
  const cors = require("cors");
  const { MONGOURI } = require("./config/keys");

  const app = express();
  
  // // Connect Database
  mongoose.connect(MONGOURI, { useNewUrlParser: true })
  const db = mongoose.connection;                                                                                
  db.on('error', error => console.error(error))
  db.once('open', () => console.log('Connected to Mongoose'));

  
  
//passport middleware
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

app.use('/api/users', require('./routes/user'));

//Passport Config
require("./config/passport")(passport);
  
  // Define Routes
 
  
  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 3001;
  
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  