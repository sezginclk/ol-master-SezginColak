var _Map, _Draw, _Source, _Layer, CoordinateX, CoordinateY;

document.addEventListener("DOMContentLoaded", () => {

    InitializeMap();


    $('#saveRecord').on('click', function () {

        var Name = $('#txtName').val();
        var Number = $('#txtNumber').val();
        var CoordinateX = $('#txtCoordinateX').val();
        var CoordinateY = $('#txtCoordinateY').val();
        var dataPost = {
            Name: Name,
            Number: Number,
            CoordinateX: CoordinateX,
            CoordinateY: CoordinateY
        }

        $.ajax({
            type: "POST",
            url: "/Home/AddRecord",
            data: dataPost,
            dataType: "json",
            success: function (response) {
                $('#addModal').modal('hide');
                if (response == 1) {
                    alert("Başarılı");
                }
                else {
                    alert("Başarısız");
                }

                location.reload();
            }
        });


    });


});




InitializeMap = () => {

    $.ajax({
        type: "POST",
        url: "/Home/GetMapRecord",
        dataType: "json",
        success: function (response) {
            const features = [];
            console.log(response);
            if (response != null) {
                $.each(response, function (i, value) {


                    features.push(new ol.Feature({
                        geometry: new ol.geom.Point([
                            value.CoordinateX, value.CoordinateY
                        ])
                    }));


                });
                // create the source and layer for random features
                const vectorSource = new ol.source.Vector({
                    features
                });
                const vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 8,
                            fill: new ol.style.Fill({ color: 'red' })
                        })
                    })
                });

                _Source = new ol.source.Vector({ wrapX: false });



                _Map = new ol.Map({
                    target: 'map',
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        }),
                        vectorLayer
                    ],
                    view: new ol.View({
                        center: [3875337.272593909, 4673762.797695817],
                        zoom: 7
                    })
                });
            }
            else {
                _Source = new ol.source.Vector({ wrapX: false });

                _Layer = new ol.layer.Vector({
                    source: _Source,
                });

                _Map = new ol.Map({
                    target: 'map',
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        }),
                        _Layer
                    ],
                    view: new ol.View({
                        center: [3875337.272593909, 4673762.797695817],
                        zoom: 7
                    })
                });
            }



            AddInteraction();
        }
    });

}

AddInteraction = () => {

    _Draw = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });

    _Map.addInteraction(_Draw);

    _Draw.setActive(false);

    _Draw.on(
        "drawend",
        (_event) => {

            $('#txtName').val();
            $('#txtNumber').val();

            CoordinateX = _event.feature.getGeometry().getCoordinates()[0];
            CoordinateY = _event.feature.getGeometry().getCoordinates()[1];
            $('#txtCoordinateX').val(CoordinateX);
            $('#txtCoordinateY').val(CoordinateY);
            $('#addModal').modal('show');

            _Draw.setActive(false);
        });
}

AddPoint = () => {

    _Draw.setActive(true);
}

var DatatableRecord;

QueryPoint = () => {

    $('#recordTable').hide();
    $.ajax({
        type: "POST",
        url: "/Home/GetMapRecord",
        dataType: "json",
        success: function (response) {
            $('#mapRecord').html("");

            $.each(response, function (i, value) {
                var addedRow = `<tr>
                        <td>${value.Name}</td>
                        <td>${value.Number}</td>
                        <td>${value.CoordinateX}</td>
                        <td>${value.CoordinateY}</td>
                    </tr>`;
                $('#mapRecord').append(addedRow);
            });

            $('#showRecordModal').modal('show');
        }
    }).then(function () {
        $('#recordTable').show();
    });
}


