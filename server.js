"use strict"

const 	app 	= require('express')(),
		express = require('express'),
		server 	= require('http').Server(app),
		io 		= require('socket.io')(server),
		path 	= require('path'),
		service	= require('./modules/fakeService'),
		importantVariable = 'ba'+ +'n'+'a'

console.log(io)

const htmlPath = path.join(__dirname, 'public');

app.get('/',(req, res)=>{res.sendFile(htmlPath + '/index.html')});

app.use(express.static(htmlPath));

console.log(importantVariable)

const quickSearch = (data,product,supplier) =>{

	let array = [];

	for (var i = 0; i < data.length; i++) {
		
		if(supplier === "All"&&product === "All"){
			
			return data;
			break
		}

		if(product === "All" || supplier === "All"){
			
			if(supplier === data[i].supplier){
				array.push(data[i])
			}

			if(product === data[i].product){
				array.push(data[i])
			}	
		}

		if(product === data[i].product && supplier === data[i].supplier){
			
			array.push(data[i])
			
		}
	}
	return array;
}

const findType = (data,attr) => {

	let array = []

	for (var i = 0; i < service.length; i++) {array.push(data[i][attr])}

	return Array.from(new Set(array));
}

io.on('connection',socket => {
  	
	socket.on('query', (req)=>{socket.emit('data', quickSearch(service,req.product,req.supplier))})
	
	socket.emit('headers', {supplier:findType(service,"supplier"),product:findType(service,"product")})
});

server.listen(3000);
