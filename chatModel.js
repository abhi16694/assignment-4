
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var chatSchema = new Schema({

	userName 			: {type:String,default:'',required:true},
	chatHistory			: []
	

});


mongoose.model('Chat',chatSchema);