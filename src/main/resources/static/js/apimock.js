//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[
		{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 	{author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
		{author:"johnconnor","points":[{"x":34,"y":76},{"x":190,"y":71}],"name":"tree"},
		{author:"johnconnor","points":[{"x":370,"y":210},{"x":152,"y":212},{"x":350,"y":350}],"name":"car"},
	];

	mockdata["maryweyland"]=[
		{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 	{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"},
		{author:"maryweyland","points":[{"x":120,"y":120},{"x":115,"y":125}],"name":"tree2"},
		{author:"maryweyland","points":[{"x":130,"y":111},{"x":125,"y":135}],"name":"car2"}];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/   