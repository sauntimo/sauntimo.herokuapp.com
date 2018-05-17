
(function init(){

    addYearFilterClickHandlers();

    jsn_trips = getData( 'trips' );
    jsn_countries = getData( 'countries' );
    arr_emoji_flags = getData( 'emoji_flags' );

    arr_trips = jsn_trips.trips;
    arr_countries = jsn_countries.countries;

    var arr_test = [];
    //var arr_non_flag = ['de','es','fr','us','it','jp']


})();

function getData( name ){
    return JSON.parse( 
        document.getElementsByClassName( 'data' )[0]
            .getAttribute( 'data-' + name )
    );
}

getData();

mapboxgl.accessToken = 'pk.eyJ1Ijoic2F1bnRpbW8iLCJhIjoiY2o4bmE1bHFvMTRieDMzbzM3NzZycXNiNSJ9.7UXCMoMVdAKX5dFedZbs2A';

var arr_highlighted = [];

// center coordinates 
var c_lng = -2.6063833;
var c_lat = 51.4532008;

// create new map element
var map = new mapboxgl.Map({
    container: 'map', // html element to put map into
    style: 'mapbox://styles/mapbox/light-v9', // mapbox style
    center: [c_lng, c_lat], // center map on theses coords
    zoom: 1 // zoom map in to this level
});

// add zoom controls
map.addControl(new mapboxgl.NavigationControl());

// when the map loads, run this function
map.on('load', function () {

    map.addSource('countries', {
        type: 'geojson',
        data: '/js/countries.geojson'
        // data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
    });

    map.addLayer({
        'id': 'countries-layer',
        'type': 'fill',
        'source': 'countries',
        'paint': {
            'fill-color': 'rgba(200, 100, 240, 0)',
            'fill-outline-color': 'rgba(200, 100, 240, 0.3)'
        }
    });

    map.addLayer({
        "id": "countries-fills-clicked",
        "type": "fill",
        "source": "countries",
        "layout": {},
        "paint": {
            "fill-color": 'rgba(100, 100, 255, 0.5)',
        },
        "filter": ["in", "iso_a3", '' ]
    });


    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.
    map.on('click', function (e) {
        
        var features = map.queryRenderedFeatures(
            e.point,
            {
                layers: ['countries-layer']
            }
        );

        if (!features.length) {
            return;
        }

        var feature = features[0];
        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML("<p>"+feature.properties.name+"</p>")
            .addTo(map);
    });

    highlightTripsByYear( arr_trips, 'all' );

});


function replaceHighlight( arr_highlighted ){

    var arr_filter = [
        'in',
        'iso_a3'
    ];

    arr_filter = arr_filter.concat( arr_highlighted );

    map.setFilter( 
        'countries-fills-clicked',
        arr_filter
    );

}


function highlightTripsByYear( arr_trips, year ){

    clearCountryTags();
    var arr_country_codes = [];
    var arr_country_names = [];

    for( trip_id in arr_trips ){

        var trip = arr_trips[ trip_id ];

        // ignore this trip if in wrong year
        if( year != 'all' &&
            trip.arr_years.indexOf( year ) === -1 
        ){
            continue;
        }

        for( destination_id in trip.arr_destinations ){

            var destination = trip.arr_destinations[ destination_id ];

            if( arr_country_codes.indexOf( destination.country.code ) === -1 ){
                arr_country_codes.push( destination.country.code );
                arr_country_names.push( destination.country.name );
            }

        }
    }

    // arr_country_names.sort();

    for( country_pos in arr_country_names ){
        
        var name = arr_country_names[ country_pos ];
        var iso_a3 = arr_country_codes[ country_pos ];

        var this_country = getCountryfromISO_A3( iso_a3 );
        var iso_a2 = this_country.iso_a2;
        // var emoji = getEmojiFromISO_A2( iso_a2 );

        addCountryTag( this_country.icon, name );
    }

    replaceHighlight( arr_country_codes );

}

function getCountryfromISO_A3( iso_a3 ){

    for( var i = 0; i < arr_countries.length; i++ ){

        var this_country = arr_countries[ i ];
        
        if( this_country.iso_a3 === iso_a3 ){
            return this_country;
        }
    }
}

function getEmojiFromISO_A2( iso_a2 ){

    for( var i = 0; i < arr_emoji_flags.length; i++ ){

        var this_country = arr_emoji_flags[ i ];
        
        if( this_country.code === iso_a2 ){
            return this_country.emoji;
        }
    }

}

function addYearFilterClickHandlers(){

    var all_filters = document.getElementsByClassName( 'year-filter' );

    for( var filter_id = 0; filter_id < all_filters.length; filter_id++ ){

        all_filters[ filter_id ].addEventListener( 'click', function(){
            
            var prev_active = document.querySelectorAll( '.year-filter.active' );
            if( prev_active.length > 0 ){
                prev_active[0].classList.remove( 'active' );
            }

            this.classList.add( 'active' );

            var value = this.getAttribute( 'data-value' );

            // only convert the years to numbers, not the text 'all'
            value = ( value === 'all' ? value : parseInt( value, 10 ) );

            highlightTripsByYear( arr_trips, value );

        });

    }

}

function clearCountryTags(){
    var div = document.getElementsByClassName( 'country-tags' )[0];
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function addCountryTag( icon_class, name ){

    var tag = document.createElement( 'span' );
    tag.classList.add( 'country-tag' );
    tag.innerHTML = '<i class="em ' + icon_class + '"></i> ' + name;
    // tag.innerHTML = '<span class="emoji">' + emoji + '</span> ' + name;
    var div = document.getElementsByClassName( 'country-tags' )[0];
    div.appendChild( tag );
}

