'use strict';

let Schema = require('mongoose').Schema;

var User = new Schema({
	auth: {
		mail:{
			require: true,
			type: String,
			unique: true
		},
		hashed_password:{
			type:String,
			require: true
		},
		salt:{
			type:String,
			require: true
		}
	},

	pubInform:{
		name:{
			type:String,
			require: true
		},
		surname:{
			type:String,
			require: true
		},
		photo:{
			type: String,
			require: false,
			default: ''
		},
		university:{
			type: Schema.Types.ObjectId,
			require: true
		},
		faculty:{
			type: Schema.Types.ObjectId,
			require:true
		},
		group:{
			type: String,
			require: false
		},
		year:{
			type: Number,
			require:true
		}
	},

	prInform:{
		mail:{
			type: String
		},
		phone:{
			type: String
		}
	},

	privacy:{
		blockedUsers:[Schema.Types.ObjectId]
	},

	contacts:[{
		id: Schema.Types.ObjectId,
		updated: {
			type:Date,
			default:Date.now()
		},
		_id:0
	}],

	projects:[{}],

	settings:{
		im:[
			{
				convId: Schema.Types.ObjectId,
				notification: Boolean,
				tag:{
					title:String,
					color: String
				},
				_id:0
			}
		]
	},

	authActions:{
		mailSubmit: {
			done: {
				type: Boolean,
				default: false
			},
			key: {
				type: String,
				default: false
			}
		},
		mobileSubmit: {
			done: {
				type: Boolean,
				default: false
			},
			key: {
				type: String,
				default: false
			}
		},
		documentSubmit: {
			done: {
				type: Boolean,
				default: false
			},
			key: {
				type: String,
				default: false
			}
		},
		changePassword:{
			key: {
				type: String,
				default: false
			}
		}
	},

	created:{
		type: Date,
		default: Date.now()
	}

}, {
	collection: 'users'
});

module.exports = User;
