const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
     /* const userEmail = await User.findOne({ email })
      if (userEmail) {
        return res.status(400).json({ message: "Cette email existe déjà" })
      }*/
    
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.signin = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'login ou mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'login ou mot de passe incorrecte' });
                }
                
                res.status(200).json({
                    //userId: user._id,
                    
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ),

                    user: {
                      firstname: user.firstname,
                      lastname: user.lastname,
                      username: user.username
                    }
                });

              // this.getUserId(user._id)
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.user = (req, res, next) => {
  console.log(req.body)
  User.findOne({username: req.body.username, password: req.body.password})
  .then((user) => res.status(200).json(user))
  .catch((error) => res.status(401).json({error: error}))
}

exports.logout = (req, res, next) => {

    try {
    // Sending success response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // Handling errors
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}