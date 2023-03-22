var api = apiclient;

var app = (function () {
    var author;
    var currentBlueprint = null;
    var creating = false;

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

    function repaint() {

        if(currentBlueprint == null)
            return;

        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext('2d');
        let points = currentBlueprint.points;
        let amount = points.length;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.fillStyle = "black";

        if (amount == 0) return;

        let iterations = amount % 2 == 0 ? amount / 2 : (amount - 1) / 2;

        for (let i = 0; i < iterations; i++) {
            let position = 2 * i;
            let p1 = points[position];
            let p2 = points[position + 1];
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
        }

        if (amount % 2 != 0) {
            let p = points[amount - 1];
            context.fillRect(p.x, p.y, 5, 5);
            return;
        }
        
    }

    function addPointOnCanvas(event) {

        if(currentBlueprint == null)
            return;

        currentBlueprint.points.push({x: event.offsetX, y: event.offsetY});
        repaint();
    }

    function create() {
        let bpname = prompt("Insert the blueprint's name: ");

        currentBlueprint = {
            author: author,
            name: bpname,
            points: []
        };

        creating = true;
        $('#nameblu span').text(bpname);
        repaint();
    }

    function save() {
 
        api.saveBlueprint(currentBlueprint, creating, () => {
            creating = false;
            alert("Cambios guardados correctamente!");
            getNameAuthorBlueprints();
        });

    }

    function remove() {
    
        api.removeBlueprint(currentBlueprint, () => {
            creating = false;
            getNameAuthorBlueprints();
            currentBlueprint = null;
            $('#nameblu span').text("");
            let canvas = document.getElementById("myCanvas");
            let context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        });
    
    }

    return {
        init: () => {
            $('#myCanvas').on('pointerdown', addPointOnCanvas);
            $('#btnCreate').on('click', create);
            $('#btnSave').on('click', save);
            $('#btnDelete').on('click', remove);
        },
        getNameAuthorBlueprints: getNameAuthorBlueprints,
        selectAuthor: (author) => {
            _selectedAuthor = author;
            api.getBlueprintsByAuthor(author, (blueprints) => _selectedBlueprints = blueprints);
        },
        draw: (blueprint) => {

            $('#nameblu span').text(blueprint);

            api.getBlueprintsByNameAndAuthor(author, blueprint, (found) => {
                currentBlueprint = structuredClone(found);
                repaint();
            });

        }
    };

    })();
