const User = require('../models/User');

module.exports = {
   

    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({email, password});

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
          }

          return res.status(200).json(user);
    },

    
}