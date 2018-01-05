// 4 - CRUD postagens utilizando Express:
// 4.1 - Fornecer listagem das postagens na url: http://127.0.0.1:8000/posts via método GET;
// 4.2 - Cadastrar novas postagens via url: http://127.0.0.1:8000/posts via método POST;
// 4.3 - Visualizar uma postagem via url: http://127.0.0.1:8000/posts/<id-da-postagem> via método GET;
// 4.4 - Atualizar uma postagem via url: http://127.0.0.1:8000/posts/<id-da-postagem> via método PUT;


module.exports = function(app) {

    var posts = require('../controllers/post.controller.js');

    // Create a new Post
    app.post('/posts', posts.create);
    
    // Retrieve all Posts
    app.get('/posts', posts.findAll);

    // Retrieve all Posts from json
    app.get('/postsFromJson', posts.postsFromJson);

    // Retrieve all Posts from page
    app.get('/postsFromPage', posts.postsFromPage);

    // Retrieve a single Post with postId
    app.get('/posts/:postId', posts.findOne);

    // Update a Post with postId
    app.put('/posts/:postId', posts.update);

    // Delete a Post with postId
    app.delete('/posts/:postId', posts.delete);

}