(function() {
  $(function() {
    var map, timetable;
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
    return $("#faq-items").masonry({
      itemSelector: ".item",
      gutter: 10,
      isFitWidth: true
    });
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/