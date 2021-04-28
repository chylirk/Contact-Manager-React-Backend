const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exist(1);
}

const password = process.argv[2];

const url = `mongodb+srv://passwordpassword:${password}@cluster0.arcet.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv[3] && process.argv[4]) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	});

	person.save().then(result => {
		console.log('person saved!');
		mongoose.connection.close()
	});
} else if (process.argv.length == 3) {
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person);
		})
		mongoose.connection.close();
	})
}
