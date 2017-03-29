var dynalite = require('dynalite');
var dynaliteServer = dynalite({path: './db', createTableMs: 50})

dynaliteServer.listen(4567, function(err) {
	if (err) throw err
	console.log('Dynalite started on port 4567')
})