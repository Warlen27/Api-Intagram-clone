const Post = require('../models/Post');
const User = require('../models/User');


module.exports = {

    async show(req, res) {
        const { author_id } = req.params;
    
        const posts = await Post.find({ author: author_id }).sort('-createdAt')
        .populate('author', ['name', 'username', 'avatar']).execPopulate();
    
        return res.json(posts);
      },

    async index(req, res) {
        const posts = await Post.find().sort('-createdAt')
        .populate('author', ['username', 'avatar']);

        return res.json(posts);
    },

    async store(req, res) {

        try {
        const { description } = req.body;
        const { filename: thumbnail } = req.file;
        
        
        const author = await User.findById(req.params.id);
           
        const post = await Post.create({
            description,
            thumbnail,
            author
        });

        await post.
        populate('author', ['username', 'avatar'])
        .execPopulate();

        
       
        author.posts.push(post);

        await author.save();

       


        req.io.emit('post', post);

        return res.json(post);
    } catch(err){
        res.status(400).send(err)
    }
        
    },

    async update(req, res){
        try{
          const post = await Post.findById(req.params.id);
               post.description = req.body.description;
                   if (req.file) {
                       const image = req.file.filename;
                       post.image = image;
                   
                     
                   }
                  
                  await post.save()

                  req.io.emit('update', post);

                       return res.json(post);
                        
            } catch(err){
                res.status(400).send(err)
              }
        
        },
   
       async destroy(req, res){
           try{  
   
               const post =  await Post.findById(req.params.id);
            
                   post.remove();
   
           
                   req.io.emit('delete', post);
   
                   return res.json(post); 
           
   
           
                } catch(err){
                    res.status(400).send(err)
                }
       
       },
};
