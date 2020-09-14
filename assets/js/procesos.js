
// Función para acceder mediante la url a la información de la API abierta de Pokemon "pokeapi"
$(function () {

    var pokeurl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=807";
    var infor = "https://pokeapi.co/api/v2/pokemon/";
    var ctx = document.getElementById('myChart').getContext('2d');

    var resetCanvas = function () {
        $('#myChart').remove();
        $('.grafica').append('<canvas id="myChart" style="background-color: white"><canvas>');

        canvas = document.querySelector('#myChart');
        ctx = canvas.getContext('2d');
        ctx.canvas.width = $('#graph').width();
        ctx.canvas.height = $('#graph').height();

        var x = canvas.width / 2;
        var y = canvas.height / 2;
        ctx.font = '10pt Verdana';
        ctx.textAlign = 'center';
        ctx.fillText('This text is centered on the canvas', x, y);
    };

    $.ajax({
        url: pokeurl
    })
        .done(function (info) {
            $.each(info.results, function (index, pokemon) {
                $(".fotoPke").hide();
                $(".infoPoke").show();
                $(".fotoPk").hide();
                $("#myChart").hide();

                var nombre = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                var id = index + 1;
                var link = $("<a>").attr("id", pokemon.name).attr("href", "#").append($("<strong>").text(nombre));
                var par = $("<p>").html("#" + id + " - ").append(link);
                $(".infoPoke").append(par);
     
                link.click(function (event) {
                    $.ajax({
                        url: 'https://pokeapi.co/api/v2/pokemon/' + pokemon.name
                    })
                        .done(function (detalles) {
                            $(".fotoPk").hide();

                            var pokeFoton = $("#fotoPoken");
                            var pokeFotos = $("#fotoPokes");
                            var textnormal = $("#texton");
                            var textshiny = $("#textos");
                            pokeFoton.empty();
                            pokeFotos.empty();
                            textnormal.empty();
                            textshiny.empty();

                            textnormal.append("Forma normal");
                            pokeFoton.append("<img src='" + detalles.sprites.front_default + "'>");
                            textshiny.append("Forma Shiny")
                            pokeFotos.append("<img src='" + detalles.sprites.front_shiny + "'>");
                            $(".fotoPk").show();
                            
                        });

                });
            });
        });
    $(".buscar").click(function (eventos) {
        var nombre_consulta = $("#nombrepk").val();
        if (nombre_consulta === undefined || nombre_consulta === null) (
            alert("Pokemon inexistente !!. Inténtelo nuevamente")
        )
        else if (nombre_consulta !== undefined || nombre_consulta !== null) (
            $.ajax({
                url: pokeurl,
                dataType: 'json'
            })
        )
            .done(function (graficas) {
                $.each(graficas.results, function (indices, pokes) {

                    $(".infoPoke").hide();
                    $(".fotoPk").hide();
                    $(".fotoPke").show();
                    resetCanvas();
                    var pokenom = $("#textinfa");
                    var fotopoke = $("#fotoPokene");
                    var pesopoke = $("#pesopoke");
                    var alturapoke = $("#alturapoke");
                    var tipopoke = $("#tipopoke");
                    var habilidadpoke = $("#habilidadpoke");
                    var indices;
                    var nombre_interno;

                    if (nombre_consulta.toLowerCase() === pokes.name.toLowerCase()) (
                        nombre_interno = pokes.name.charAt(0).toUpperCase() + pokes.name.slice(1),
                        pokenom.empty(),
                        pokenom.append("# " + indices + " " + nombre_interno),
                        $.ajax({
                            url: infor + nombre_consulta.toLowerCase(),
                            dataType: 'json'
                        })
                            .done(function (char) {
                                fotopoke.empty(),
                                    fotopoke.append("<img src='" + char.sprites.front_default + "'>");
                                pesopoke.empty();
                                pesopoke.append("Peso: " + (parseInt(char.weight) * 0.1).toFixed(1) + " [Kg]");
                                alturapoke.empty();
                                alturapoke.append("Altura: " + parseInt(char.height) * 10 + " [cm]");
                                var tipines = [];
                                $.each(char.types, function (i, tipos) {
                                    tipopoke.empty(),
                                        tipines[i] = tipos.type.name;
                                    if (tipines[1] !== undefined) {
                                        tipopoke.append("Tipos: " + tipines[0] + " / " + tipines[1]);
                                    }
                                    else {
                                        tipopoke.append("Tipo: " + tipines[0]);
                                    }
                                })
                                var habiles = [];
                                $.each(char.abilities, function (o, hab) {
                                    habilidadpoke.empty(),
                                        habiles[o] = hab.ability.name;
                                    if (habiles[1] !== undefined) {
                                        habilidadpoke.append("Habilidades: " + "<br>" + habiles[0] + " / " + habiles[1]);
                                    }
                                    else {
                                        habilidadpoke.append("Habilidad: " + "<br>" + habiles[0]);
                                    }
                                })
                                var pokeFotonBa = $("#fotoPokenBa");
                                var pokeFotosBa = $("#fotoPokesBa");
                                var textnormalBa = $("#textonBa");
                                var textshinyBa = $("#textosBa");
                                var pokefotonBc = $("#fotoPokenBc");
                                var textnormalBc = $("#textonBc");
                                pokefotonBc.empty();
                                textnormalBc.empty();
                                pokeFotonBa.empty();
                                pokeFotosBa.empty();
                                textnormalBa.empty();
                                textshinyBa.empty();

                                textnormalBa.append("Forma Shiny");
                                pokeFotonBa.append("<img src='" + char.sprites.front_shiny + "'>");
                                $(".fotoPkB").show();
                            })
                    )

                });
                $.ajax({
                    url: infor + nombre_consulta.toLowerCase(),
                    dataType: 'json'
                })
                    .done(function (stat) {
                        var estadisticas = [];
                        $.each(stat.stats, function (u, datos) {

                            estadisticas[u] = parseInt(datos.base_stat);

                        })
                        console.log(estadisticas);
                        $("#myChart").show();

                        var myChart = new Chart(ctx, {

                            type: 'bar',
                            data: {
                                labels: ['Ataque', 'Salud', 'Defensa', 'Velocidad', 'Atk Esp', 'Def Esp'],
                                datasets: [{
                                    label: 'Stats Base del Pokemon',
                                    data: [estadisticas[1], estadisticas[0], estadisticas[2], estadisticas[5], estadisticas[3], estadisticas[4]],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1

                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }

                        });
                    });
            });



        $(document).ready(function () {
            $(".volver").click(function () {
                $(".infoPoke").show();
                $(".fotoPke").hide();
                $(".fotoPk").hide();
                $(".fotoPkB").hide();
                $("#myChart").hide();
                resetCanvas();
            });
        });
    });

});