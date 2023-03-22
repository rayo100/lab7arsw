var apiclient = (function(){
    return {
        getBlueprintsByAuthor: function(author, callback){
        callback(
            JSON.parse($.ajax({type: 'GET', url: 'blueprints/' + author, async: false}).responseText)
        )},

        getBlueprintsByNameAndAuthor: function(author, bpname, callback){
        var link = author + "/" + bpname;
        callback(
            JSON.parse($.ajax({type: 'GET', url: 'blueprints/' + link, async: false}).responseText)
        )},

        saveBlueprint:function(blueprint, creating, callback) {

            let pts = [];
            blueprint.points.forEach(element => {
                pts.push(parseInt(element.x) + "," + parseInt(element.y));
            });

            if(creating) {
                $.ajax({type: 'POST', contentType: "application/json", url: 'blueprints/create', async: false, data: JSON.stringify({
                    author: blueprint.author,
                    name: blueprint.name,
                    points: pts
                })});
                callback();
            } else {
                let link = "blueprints/" + blueprint.author + "/" + blueprint.name;
                $.ajax({type: 'PUT', contentType: "application/json", url: link, async: false, data: JSON.stringify({
                    author: blueprint.author,
                    name: blueprint.name,
                    points: pts
                })});
                callback();
            }

		},

		removeBlueprint:function(blueprint, callback) {
            let link = "blueprints/" + blueprint.author + "/" + blueprint.name;
            $.ajax({type: 'DELETE', url: link, async: false});
			callback();
		}
    }
})();