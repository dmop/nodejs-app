var Post = require('../models/post.model.js');
var config = require('../../config/config');
var axios = require('axios');
var cheerio = require('cheerio');
var request = require('request');


exports.create = function(req, res) {
    // Create and Save a new Post
    if(!req.body.body) {
        res.status(400).send({message: "Post can not be empty"});
    }
    // || "Untitled Post", content: req.body.content
    var post = new Post({id:req.body.id, title: req.body.title, body:req.body.body });

    post.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error ocuured while creating the Post."});
        } else {
            res.send(data);
        }
    });
};

exports.postsFromJson = function(req, res) {
    axios.get(config.postsApi)
       .then(function (response) {

             var allPosts = response.data;
             
             allPosts.map(function(post) {
                
                var post = new Post({id:post.id, title: post.title, body:post.body });
                
                post.save(function(err, data) {
                    if(err) {
                        console.log(err);
                        res.status(500).send({message: "Some error ocuured while creating the Post."});
                    } else {
                        // console.log(data);
                    }
                });

                });  
                res.send(allPosts);        
            })
            .catch(function (error) {
                  console.log(error);
            });
};


exports.postsFromPage = function(req, res) {
    // Create and Save a new Post

    axios.get(config.newsPage)
    .then(function (response) {
        var html = response.data;

        var $ = cheerio.load(html);
        var parsedResults = [];

        $('h2.tileHeadline').each(function(i, element){
            var a = $(this).children();
            var title = a.text();

            var b = $(this).next();
            
            var body = b.children().text();
            
            var metadata = {
                     id: Math.floor(Math.random() * (9000 - 100 + 1) + 100),
                     title: title,
                     body:body
            };
            // Push meta-data into parsedResults array
            parsedResults.push(metadata);
        });

        parsedResults.map(function(post) {
                
            var post = new Post({id:post.id, title: post.title, body:post.body });
            
            post.save(function(err, data) {
                if(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error ocuured while creating the Post."});
                } else {
                    // console.log(data);
                }
            });
            });  
        // Log our finished parse results in the terminal
        // console.log(parsedResults);
        res.send(parsedResults)

    })
    .catch(function (error) {
        console.log(error);
  });


};


exports.findAll = function(req, res) {
    // Retrieve and return all posts from the database.
    Post.find(function(err, posts){
        if(err) {
            res.status(500).send({message: "Some error ocuured while retrieving posts."});
        } else {
            res.send(posts);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single post with a postId
    Post.findById(req.params.postId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve post with id " + req.params.postId});
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a post identified by the postId in the request
    Post.findById(req.params.postId, function(err, post) {
        if(err) {
            res.status(500).send({message: "Could not find a post with id " + req.params.postId});
        }
        post.id = req.body.id
        post.title = req.body.title;
        post.body = req.body.body;

        post.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update post with id " + req.params.postId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a post with the specified postId in the request
    Post.remove({_id: req.params.postId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete post with id " + req.params.id});
        } else {
            res.send({message: "Post deleted successfully!"})
        }
    });
};

