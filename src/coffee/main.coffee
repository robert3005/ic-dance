require "bootstrap"
require "masonry"
require "plugins"
React = require "react"
$ = require "jquery"
_ = require "lodash"
Map = require "./map"
Calendar = require "./calendar"


$ ->
    timetable = document.getElementById "timetable-calendar"
    React.renderComponent Calendar(), timetable

    map = document.getElementById "map"
    google.maps.event.addDomListener window, "load", ->
        React.renderComponent Map(), map

    $(".nav a").on "click", ->
        $(".navbar-toggle").click() if window.innerWidth < 992

    $("body").scrollspy
        target: ".navbar-fixed-top"
        offset: 61

    $("footer a").tooltip
        placement: "right"

    container = document.getElementById "faq-items"
    msnr = new Masonry container,
        itemSelector: ".item"
        gutter: 10
        isFitWidth: true
        isInitLayout: false
    msnr.on "layoutComplete", ->
        _.defer -> $("body").scrollspy "refresh"

    msnr.layout()

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
