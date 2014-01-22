$ ->
    timetable = document.getElementById "timetable-calendar"
    React.renderComponent Calendar(), timetable
    $('footer a').tooltip
        placement: "right"
