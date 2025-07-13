const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const configdb = require('./model/db.js')
const usermodel = require('./model/UserModel.js');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configdb().then(()=>{
  console.log('Database connected successfully');
}).catch((err)=>{
  console.error('Database connection failed:', err);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
   if(email === '' || password === '') {
    return res.status(400).json({ message: 'Email and password are required.' });
   }
  usermodel.findOne({ email: email, password: password })
    .then(user => {
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    })
    .catch(err => {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal server error' });
    });


});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});