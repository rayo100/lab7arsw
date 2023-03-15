var api = apimock;

var app = (function () {
    var author;
    var blueprintName;

    function getName() {
        $("#name").text(author + "'s " + "blueprints:");
    }

    function getNameAuthorBlueprints() {
        author = $("#author").val();
        if (author === "") {
            alert("Debe ingresar un nombre");
        } else {
            api.getBlueprintsByAuthor(author, authorData);
        }
    }

    var authorData = function (data) {
        $("#table tbody").empty();
        if (data == undefined) {
            alert("No existe el autor");
            $("#name").empty();
            $("#points").text("Total Points");
            $("#nameblu").empty();
        } else {
            getName();
            const datanew = data.map((elemento) => {
                return {
                    name: elemento.name,
                    puntos: elemento.points.length
                }
            });

            datanew.map((elementos) => {
                $("#table > tbody:last").append($("<tr><td>" + elementos.name + "</td><td>" + elementos.puntos.toString() +
                    "</td><td>" + "<button  id=" + elementos.name + " onclick=app.draw('" + elementos.name + "')>open</button>" + "</td>"));
            });

            const totalPuntos = datanew.reduce((suma, { puntos }) => suma + puntos, 0);

            $("#points").text("Total user points: " + totalPuntos);
        }
    }

    function getBlueprintByAuthorAndName(data) {
        author = $("#author").val();
        blueprintName = data.id;
        $("#nameblu").text("Current blueprint: " + blueprintName);
        api.getBlueprintByAuthorAndName(author, blueprintName, printPoints);
    }

    function printPoints(data) {
        const puntos = data.points;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
        ctx.beginPath();
        for (let i = 1; i < puntos.length; i++) {
            ctx.moveTo(puntos[i - 1].x, puntos[i - 1].y);
            ctx.lineTo(puntos[i].x, puntos[i].y);
            if (i === puntos.length - 1) {
                ctx.moveTo(puntos[i].x, puntos[i].y);
                ctx.lineTo(puntos[0].x, puntos[0].y);
            }
        }
        ctx.stroke();
    }

    return {
        getBlueprintByAuthorAndName: getBlueprintByAuthorAndName,
        getNameAuthorBlueprints: getNameAuthorBlueprints,
        selectAuthor: (author) => {
            _selectedAuthor = author;
            api.getBlueprintsByAuthor(author, (blueprints) => _selectedBlueprints = blueprints);
        },
        getAuthor: () => {
            return _selectedAuthor;
        },
        getBlueprints: () => {
            return _selectedBlueprints;
        },
        draw: (blueprint) => {

            api.getBlueprintsByNameAndAuthor(author, blueprint, (found) => {
                let canvas = document.getElementById("myCanvas");
                let context = canvas.getContext('2d');
                let points = found.points;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.lineWidth = 5;
                context.strokeStyle = "black";
                context.fillStyle = "black";

                if (points == 0) return;

                if (points == 1) {
                    let p = points[0];
                    context.fillRect(p.x, p.y, 5, 5);
                    return;
                }

                for (let i = 1; i < points.length; i++) {
                    let p1 = points[i];
                    let p2 = points[i - 1];
                    context.beginPath();
                    console.log(p1);
                    console.log(p2);
                    context.moveTo(p1.x, p1.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            });
        }
    };

    })();
