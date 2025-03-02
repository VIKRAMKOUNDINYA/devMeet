const bcrypt = require('bcrypt');

// Password to be hashed
const password = "Sweth@1999";

// Generate salt with a cost factor of 10
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed password:", hashedPassword);
  }
});
