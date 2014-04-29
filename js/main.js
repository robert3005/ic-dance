(function() {
  $(function() {
    var animateScroll, locationHash, map, timetable;
    timetable = document.getElementById("timetable-calendar");
    React.renderComponent(Calendar(), timetable);
    map = document.getElementById("map");
    google.maps.event.addDomListener(window, "load", function() {
      return React.renderComponent(Map(), map);
    });
    $(".nav a").on("click", function() {
      return $(".navbar-toggle").click();
    });
    $("footer a").tooltip({
      placement: "right"
    });
    $("#faq-items").masonry({
      itemSelector: ".item",
      gutter: 10,
      isFitWidth: true
    });
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
    $("a[href^=#]").click(function(ev) {
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