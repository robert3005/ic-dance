(function() {
  var $, Calendar, Map, React, _;

  require("bootstrap");

  require("masonry");

  require("plugins");

  React = require("react");

  $ = require("jquery");

  _ = require("lodash");

  Map = require("./map");

  Calendar = require("./calendar");

  $(function() {
    var animateScroll, container, locationHash, map, msnr, timetable;
    timetable = document.getElementById("timetable-calendar");
    React.renderComponent(Calendar(), timetable);
    map = document.getElementById("map");
    google.maps.event.addDomListener(window, "load", function() {
      return React.renderComponent(Map(), map);
    });
    $(".nav a:not([href='#'])").on("click", function() {
      if (window.innerWidth < 992) {
        return $(".navbar-toggle").click();
      }
    });
    $("body").scrollspy({
      target: ".navbar-fixed-top",
      offset: 61
    });
    $("footer a").tooltip({
      placement: "right"
    });
    container = document.getElementById("faq-items");
    msnr = new Masonry(container, {
      itemSelector: ".item",
      gutter: 10,
      isFitWidth: true,
      isInitLayout: false
    });
    msnr.on("layoutComplete", function() {
      return _.defer(function() {
        return $("body").scrollspy("refresh");
      });
    });
    msnr.layout();
    animateScroll = function(element) {
      var $body, $window, scrollTo;
      $window = $(window);
      $body = $("body, html");
      scrollTo = $(element).offset().top - 60;
      if (Math.abs($window.scrollTop() - scrollTo) > 1500) {
        return $body.scrollTop(scrollTo);
      } else {
        return $body.animate({
          scrollTop: scrollTo
        });
      }
    };
    $("a[href^=#]:not([href='#'])").click(function(ev) {
      var hrefAnchor;
      ev.preventDefault();
      hrefAnchor = $(this).attr("href");
      history.pushState({}, hrefAnchor, hrefAnchor);
      return animateScroll(hrefAnchor);
    });
    locationHash = window.location.hash;
    if (locationHash) {
      return _.defer(animateScroll.bind(null, locationHash));
    }
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/