$ ->
    timetable = document.getElementById "timetable-calendar"
    React.renderComponent Calendar(), timetable

    map = document.getElementById "map"
    google.maps.event.addDomListener window, "load", ->
        React.renderComponent Map(), map

    $("footer a").tooltip
        placement: "right"

    $("#faq-items").masonry
        itemSelector: ".item"
        gutter: 10
