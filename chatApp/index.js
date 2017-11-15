var app = require('express')();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('events');
var eventEmitter = new events.EventEmitter();
var dbPath  = "mongodb://localhost/chatApp";

// command to connect with database
db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

  console.log("database connection open success");

});

var fs = require('fs');

// include all our model files
fs.readdirSync('./app/models').forEach(function(file){
  // check if the file is js or not
  if(file.indexOf('.js'))
    // if it is js then include the file from that folder into our express app using require
    require('./app/models/'+file);

});// end for each

// include controllers
fs.readdirSync('./app/controllers').forEach(function(file){
  if(file.indexOf('.js')){
    // include a file as a route variable
    var route = require('./app/controllers/'+file);
    //call controller function of each file and pass your app instance to it
    route.controllerFunction(app)

  }

});//end for each

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/views/index.html');
});

var mongoose = require('mongoose');
var chatModel = mongoose.model('Chat');

var users=0;

//io connection is established

io.on('connection', function(socket){

  //Emits the information about the number and name of user.
  socket.on('user',function(data){

          //console.log(data + " came online");

          io.emit('chat message', data +" came online");

          ++users;

          if(users>1)
          {
              //console.log( users + " users in the chat room now!!");

              io.emit('chat message', users +" users in the chat room now!!");
          }
          else
          {
              //console.log("1 user in the chat room now!!");

              socket.emit('chat message', users +" user in the chat room now!!");
          }
        
          socket.user = data; // Allocating a socket variable.

    
  });

  //Start of node.js event feature
  eventEmitter.on('chat',function(msg,user){

        //Mongodb model for saving the chat of users
        var newchat = new chatModel
        ({
            
             userName    :user,
             chatHistory :msg
       
        })

        socket.emit('history', newchat.userName +" said");
        //console.log(newchat.userName + " has chat history as follows");
        socket.emit('history', newchat.chatHistory);
        //console.log(newchat.chatHistory);
     


  });//End of node.js event feature

  //Emits which User is typing
  socket.on('is typing', function(data){

        socket.broadcast.emit('chat message', data+" is typing");

    });

  //Emits the message of a particular user with identity
  socket.on('chat message', function(msg){

     
     io.emit('chat message', socket.user+' : '+msg);
     eventEmitter.emit('chat',msg,socket.user);
     
  });
  
  //Emits notifications whenever user leaves the chat with the information who left and how many left in the chat now.
  socket.on('disconnect',function(){
  	 
  	 console.log("some user left the chat");

     socket.broadcast.emit('chat message', socket.user+" left the chat");

  	 users--;
     
     if(users>1) 
       {
        console.log(users + " user online now!!");

        io.emit('chat message', users +" users in the chat room now!!");
       }
      else if(users===1)
       {
          io.emit('chat message', users +" user in the chat room now!! You can see the history of your chat if you like.");

          console.log("1 user in the chat room now!! You can see the history of your chat if you like.");
       }
      else if(users===0)

      console.log("No user online now!!");



  }); //end socket disconnected.

});//end of io connection.


http.listen(1600, function(){
  console.log('listening on port :1600');
});
