`/** @jsx React.DOM */`
styles = [
    {
        "featureType": "landscape"
        "stylers": [{
            "color": "#EBE6E0"
        }]
    }
    {
        "featureType": "road.highway"
        "elementType": "geometry.fill"
        "stylers": [{
            "color": "#FFFFFF"
        }]
    }
    {
        "featureType": "road.highway"
        "elementType": "geometry.stroke"
        "stylers": [{
            "color": "#FFFFFF"
        }]
    }
    {
        "featureType": "road.arterial"
        "elementType": "geometry.fill"
        "stylers": [{
            "color": "#FFFFFF"
        }]
    }
    {
        "featureType": "road.arterial"
        "elementType": "geometry.stroke"
        "stylers": [{
            "color": "#FFFFFF"
        }]
    }
    {
        "featureType": "road.local"
        "elementType": "geometry.fill"
        "stylers": [{
            "color": "#FFFFFF"
        }]
    }

    {
        "featureType": "water"
        "stylers": [{
            "color": "#73B5E5"
        }]
    }
    {
        "featureType": "poi"
        "elementType": "geometry.fill"
        "stylers": [{
            "color": "#D3E0AA"
        }]
    }
]

Map = React.createClass
    mapOptions:
        center: new google.maps.LatLng(51.4989207, -.1769148)
        zoom: 15
        mapTypeId: google.maps.MapTypeId.ROADMAP
        navigationControl: true
        mapTypeControl: false
        scaleControl: false
        styles: styles

    contentString: """
        <div class="infoWindow" style="overflow: none">
            <strong>Imperial College London</strong>
            <p>
                South Kensington Campus<br />
                Exhibition Road<br />
                London, SW7 2AZ<br />
            </p>
        </div>
    """

    getInitialState: ->
        map: null
        infoWindow: null
        marker: null

    componentDidMount: (root) ->
        map = new google.maps.Map @refs.map.getDOMNode(), @mapOptions

        infowindow = new google.maps.InfoWindow(
            content: @contentString
        )

        marker = new google.maps.Marker
            position: new google.maps.LatLng 51.4989207, -0.1769148
            map: map
            title: "Imperial College Dance Club"

        google.maps.event.addListener marker, "click", =>
            @state.infowindow.open @state.map, @state.marker

        @setState
            map: map
            infowindow: infowindow
            marker: marker

    render: ->
        `<div ref="map"></div>`
