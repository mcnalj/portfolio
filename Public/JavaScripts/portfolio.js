$(document).ready(function(){

	$("#first p:nth-child(1)").delay(2000).animate(
	{
	marginLeft: 0
	},
	1500);
	$("#first p:nth-child(2)").delay(3000).animate(
	{
	marginLeft: 0
	},
	1500);
	$("#first p:nth-child(3)").delay(4000).animate(
	{
	marginLeft: 0
	},
	1500);
	$("#first p:nth-child(4)").delay(5000).animate(
	{
	marginLeft: 0
	},
	1500);

	
/*	for (var i = 1; i < 5; i++) {
		var selector = "#first p:nth-child(" + i +")";
		$(selector).animate(
	{
	opacity: 1
	},
	300); 
	
}
*/
}); // end ready
