
// TODO: get API key

google.charts.load('current', {
    'packages': ['map'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

google.charts.setOnLoadCallback(drawMap);

function drawMap () {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Address');

    var data = google.visualization.arrayToDataTable([
        ['Lat', 'Long', 'Name'],
        [ 48.6083, -2.1486, 'Lancieux, France'],
        [ 39.466667, -0.375, 'Valencia, Spain'],
        [ 53.349722, -6.260278, 'Dublin, Ireland'],
        [ 42.640278, 18.108333, 'Dubrovnik, Croatia'],
        [ 55.676097, 12.568337, 'Copenhagen, Denmark' ],
        [ 55.604981, 13.003822, 'Malmo, Sweden' ],
        [ 47.497912, 19.040235, 'Budapest, Hungary' ],
        [ 59.329323, 18.068581, 'Stockholm, Sweden' ],
        [ 60.169856, 24.938379, 'Helsinki, Finland' ],
        [ 59.913869, 10.752245, 'Oslo, Norway' ],
        [ 52.520007, 13.404954, 'Berlin, Germany' ],
        [ 50.850346, 4.351721, 'Brussels, Belgium' ],
        [ 46.204391, 6.143158, 'Geneva, Switzerland' ],
        [ 49.611621, 6.131935, 'Luxembourg, Luxembourg' ],
        [ 41.157944, -8.629105, 'Porto, Portugal' ],
        [ 38.722252, -9.139337, 'Lisbon, Portugal' ],
        [ 40.416775, -3.703790, 'Madrid, Spain' ],
        [ 41.380199, 2.179659, "Barcelona, Spain" ],
        [ 47.418362, 8.555448, "Zurich, Switzerland" ],
        [ 47.564602, 7.620189, "Basel, Switzerland" ],
        [ 50.725915, 2.290692, "Nice, France" ],
        [ 51.499228, -0.163027, "Monaco, Monaco" ],
        [ 52.218545, 21.039802, "Warsaw, Poland" ],
        [ 37.790436, -122.401266, "San Francisco, USA" ],
        [ 37.271051, -121.955204, "San Jose, USA" ],
        [ 41.687115, -72.793911, "Oakland, USA" ],
        [ 31.627493, -8.007267, "Marrakesh, Morocco" ],
        [ 59.334338, 18.10774, "Stockholm, Sweden" ],
        [ 45.669571, 9.703631, "Bergamo, Italy" ],
        [ 35.911008, 14.502904, "Sliema, Malta" ],
        [ 41.908889, 12.501282, "Rome, Italy" ],
        [ 41.902916, 12.453389, "Vatican City, Vatican City" ],
        [ 43.771204, 11.271204, "Florence, Italy" ],
        [ 44.546967, 11.357825, "Bologna, Italy" ],
        [ 54.647805, -5.820256, "San Marino, San Marino" ],
        [ 45.465609, 9.193343, "Milan, Italy" ],
        [ 36.679417, -4.495003, "Malaga, Spain" ],
        [ 50.879621, -1.869017, "Venice, Italy" ],
        [ 40.84391, 14.228442, "Naples, Italy" ],
        [ 48.869349, 2.319511, "Paris, France" ],
        [ 35.686877, 139.744297, "Tokyo, Japan" ],
        [ 40.756613, -73.969665, "New York, USA" ],
        [ 50.841716, 4.384461, "Brussels, Belgium" ],
        [ 42.697132, 23.327364, "Sofia, Bulgaria" ],
        [ 37.976395, 23.745534, "Athens, Greece" ],
        [ 44.443903, 26.100339, "Bucharest, Romania" ],
        [ 50.416961, 30.544671, "Kiev, Ukraine" ],
        [ 48.197556, 16.381353, "Vienna, Austria" ],
        [ 50.091541, 14.417004, "Prague, Czech Republic" ]
    ]);

    
    var options = {
        "mapType"        : "normal",
        "zoomLevel"      : 3,
        "showTooltip"    : true,
        "showInfoWindow" : true,
    };

    var map = new google.visualization.Map(document.getElementById('map_div'));

     map.draw(data, options);
}