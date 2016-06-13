'use strict';

let Schema = require('mongoose').Schema,
	Q = require('q'),
	DbError = require('@anzuev/studcloud.errors').DbError,
	Util = require('util');

let Document = new Schema({
	title:{
		type: String,
		required: true
	},
	author:{
		type: Schema.Types.ObjectId,
		required: true
	},
	created:{
		type: Date,
		default: Date.now()
	},
	social:{
		downloads:[Schema.Types.ObjectId],
		watches: {
			type: Number,
			default:0
		},
		likes:[Schema.Types.ObjectId],
		dislikes:[Schema.Types.ObjectId],
		comments:[
			{
				author: {
					type: Schema.Types.ObjectId,
					required: true
				},
				created:{
					type: Date,
					default: Date.now()
				},
				text: String
			}
		]
	},
	search:{
		universities:[Schema.Types.ObjectId], // id универов, в которых встречалась данная работа
		faculties: [Schema.Types.ObjectId], // id факультетов, в которых встречалась данная работа
		year: [Number], // курс
		subject: Schema.Types.ObjectId, // id предмета
		cType: Schema.Types.ObjectId //лаба, курсовая и тд
	},
	parts:[
		{
			id: String, // ссылка на файл для скачивания
			serialNumber: Number // номер файла в данной работе(1, 2 и тд)
		}
	],
	enabled: {
		type: Boolean,
		default: true
	},
	toDelete:{
		type: Boolean,
		default: false
	}
},{
	collection: 'documents'
});


Document.statics.getDocumentById = function(id){
	let deffer = Q.defer();
	var promise = this.findById(id).exec();

	promise.then(function(file){
		if(file) deffer.fulfill(file);
		else {
			throw new DbError(null, 404, Util.format('No file found by id %s', id));
		}
	}).catch(function(err){
		console.log(err);
		if(err) deffer.reject(new DbError(err, 500));
	});

	return deffer.promise;
};


module.exports = Document;
