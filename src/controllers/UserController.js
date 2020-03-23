const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.find().sort('-createdAt').populate('posts');
      
        res.json(users);
    },

    async show(req, res) {
        try {
        const profile = await User.findById(req.params.id).populate({
          path: 'posts',
          options: { sort: { createdAt: -1 } }
          
        });
    
        return res.json(profile);

    } catch(err){
        res.status(400).send(err)
    }
      },

   // async show(req, res) {
    //    const profile = await User.findById(req.params.id);
      
    //    res.json(profile);
   // },

    async store(req, res) {
            const { name, username, email, password } = req.body;

          
            const userExists = await User.findOne( { email: req.body.email } );

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
   

            const user = await User.create({
                name,
                username,
                email,
                password,
                
            });
          
    

            return res.json(user);
    },

    async destroy(req, res) {
        const user =  await User.findById(req.params.id);
         
     user.remove();


     

        return res.json(user); 

    },

    async update(req, res) {

        const user =  await User.findById(req.params.id);
        
    
       
        for (let item in req.body ) {
            user[item] = req.body[item];
           
        }
       
        if (req.file) {
            const avatar = req.file.filename;
            user.avatar = avatar;
        }
        await user.save()
        return res.json(user);
    },
}