const express = require('express');
const app = express()
const multer = require('multer');

const uploadConfig = require('./config/upload');
const LikeController = require('./controllers/LikeController');
const PostController = require('./controllers/PostController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');



const routes = express.Router();
const upload = multer(uploadConfig);




routes.post('/login',  SessionController.store);


// Cadastro de usuários
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id/del', UserController.destroy);
routes.patch('/users/:id/update', upload.single('avatar'), UserController.update);  



// Rotas post
routes.get('/posts', PostController.index);
routes.post('/posts/:id', upload.single('thumbnail'),  PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.delete('/posts/:id/del', PostController.destroy);
routes.put('/posts/:id/update', upload.single('thumbnail'), PostController.update);




// Exportando rotas
module.exports = routes;