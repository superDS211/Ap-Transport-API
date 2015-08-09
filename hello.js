function asp(ordernumber) {
	console.log("Gobi Biryani:",ordernumber);
	ittakestoolong(function(){
		console.log("Too long to deliver the food:",ordernumber);
	});
}
//Here we go how the ordering processtakes place in ASP
function ittakestoolong(fooddelivering) {
	setTimeout(fooddelivering,5000);
}
//The process of order
asp(1);
asp(2);
asp(3);
asp(4);
asp(5); 