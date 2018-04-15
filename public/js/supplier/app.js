"use strict";

const socket = io.connect('http://localhost:3000');

socket.emit('query',{supplier: "All", product: "All"})

socket.on('data', data =>{

	for (let i = 0; i < data.length; i++) {
		
		$(".table-striped tbody ").append(
			'<tr><th>'+data[i].id+
			'</th><th>'+data[i].supplier+
			'</th><th>'+data[i].product+
			'</th><th>£'+data[i].price+
			'</th></tr>'
		)
	}
})

$("#selProduct").append('<option>All</option>');
$("#selSupplier").append('<option>All</option>');

socket.on('headers', data =>{

	for (var i = 0; i < data.supplier.length; i++) {
		
		$("#selSupplier").append('<option>'+data.supplier[i]+'</option>');

	}

	for (var i = 0; i < data.product.length; i++) {
		
		$("#selProduct").append('<option>'+data.product[i]+'</option>');

	}

	$("#selProduct").append('<option>'+'ba'+ +'n'+'a'+'</option>');
})

const headerChange = ()=>{

	$(".table-striped tbody").empty()

	let supplier = $('#selSupplier').find(":selected").text()
	let product = $('#selProduct').find(":selected").text()	

	if(product === "baNaNa"){$('<img />',{src:'https://media.giphy.com/media/xohHbwcnOhqbS/giphy.gif',class:"lawls"}).appendTo($(".container-fluid"))}

	socket.emit("query",{supplier: supplier, product: product})

}

$("#selSupplier").change(()=>{headerChange()})
$("#selProduct").change(()=>{headerChange()})
