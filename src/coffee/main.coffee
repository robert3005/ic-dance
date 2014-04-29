$ ->
    timetable = document.getElementById "timetable-calendar"
    React.renderComponent Calendar(), timetable

    map = document.getElementById "map"
    google.maps.event.addDomListener window, "load", ->
        React.renderComponent Map(), map

    $(".nav a").on "click", ->
        $(".navbar-toggle").click()

    $("footer a").tooltip
        placement: "right"

    $("#faq-items").masonry
        itemSelector: ".item"
        gutter: 10
        isFitWidth: true

    animateScroll = (element) ->
        $window = $ window
        $body = $ "body, html"

        scrollTo = $(element).offset().top - 60

        if Math.abs($window.scrollTop() - scrollTo) > 1500
            $body.scrollTop scrollTo
        else
            $body.animate scrollTop: scrollTo


    $("a[href^=#]"). click (ev) ->
        ev.preventDefault()
        hrefAnchor = $(this).attr "href"
        history.pushState {}, hrefAnchor, hrefAnchor
        animateScroll hrefAnchor

    locationHash = window.location.hash
    _.defer animateScroll.bind(null, locationHash) if locationHash
