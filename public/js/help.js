let select = document.querySelector('select');

console.log(select);

function setLoc(){
	location.replace('/trips/loc/'+select.value);
}