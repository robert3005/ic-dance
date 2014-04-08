/** @jsx React.DOM */;
var Map, styles;

styles = [
  {
    "featureType": "landscape",
    "stylers": [
      {
        "color": "#EBE6E0"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#FFFFFF"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#FFFFFF"
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#FFFFFF"
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#FFFFFF"
      }
    ]
  }, {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#FFFFFF"
      }
    ]
  }, {
    "featureType": "water",
    "stylers": [
      {
        "color": "#73B5E5"
      }
    ]
  }, {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#D3E0AA"
      }
    ]
  }
];

Map = React.createClass({
  mapOptions: {
    center: new google.maps.LatLng(51.4989207, -.1769148),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    navigationControl: true,
    mapTypeControl: false,
    scaleControl: false,
    styles: styles
  },
  contentString: "<div class=\"infoWindow\" style=\"overflow: none\">\n    <strong>Imperial College London</strong>\n    <p>\n        South Kensington Campus<br />\n        Exhibition Road<br />\n        London, SW7 2AZ<br />\n    </p>\n</div>",
  getInitialState: function() {
    return {
      map: null,
      infoWindow: null,
      marker: null
    };
  },
  componentDidMount: function(root) {
    var infowindow, map, marker,
      _this = this;
    map = new google.maps.Map(this.refs.map.getDOMNode(), this.mapOptions);
    infowindow = new google.maps.InfoWindow({
      content: this.contentString
    });
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.4989207, -0.1769148),
      map: map,
      title: "Imperial College Dance Club"
    });
    google.maps.event.addListener(marker, "click", function() {
      return _this.state.infowindow.open(_this.state.map, _this.state.marker);
    });
    return this.setState({
      map: map,
      infowindow: infowindow,
      marker: marker
    });
  },
  render: function() {
    return React.DOM.div( {ref:"map"});
  }
});

/*
//@ sourceMappingURL=map.js.map
*/