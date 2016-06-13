'use strict';

let Schema = require('mongoose').Schema;



let File = new Schema({
	url: String,
	title: String,
	uploader:{
		type: Schema.Types.ObjectId
	},
	created:{
		type: Date,
		require:true,
		default: Date.now()
	},
	path: String,
	used:{
		type: Boolean,
		default: false
	},
	purpose:{

	},
	access:{
		publicAccess: Boolean,
		cType: String
	}
},{
	collection: 'files'
});

module.exports = File;
