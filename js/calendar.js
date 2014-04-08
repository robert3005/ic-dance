/** @jsx React.DOM */;
var Calendar, googleCalendarBase, googleCalendarSuffix;

googleCalendarBase = "https://www.google.com/calendar/feeds/";

googleCalendarSuffix = "%40group.calendar.google.com/public/basic";

Calendar = React.createClass({
  calendars: _.reduce({
    casual_ballroom: "olr3earjdohc3mjhb32092da4s",
    salsa: "75g92duhl999rkvdi2v6dmls14",
    technique: "0hu43sj0f9po3p64o4cck8rco0",
    beginners_team: "37vfmbf5b8intk85utod6o23bc",
    team: "d2nicj15qdd1oacuvhftq3csg4",
    rooms: "m7s6e2b9f8onjl6nn16tsisf6c"
  }, function(acc, address, name) {
    acc[name] = googleCalendarBase + address + googleCalendarSuffix;
    return acc;
  }, {}, this),
  getInitialState: function() {
    var calendarNames, x;
    calendarNames = _.keys(this.calendars);
    return _.zipObject(calendarNames, (function() {
      var _i, _len, _ref, _results;
      _ref = _.range(_.size(calendarNames));
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push(false);
      }
      return _results;
    })());
  },
  componentDidMount: function(root) {
    $(".btn", root).button();
    $(this.refs.cal.getDOMNode()).fullCalendar({
      firstDay: 1
    });
    this.toggleCalendar("casual_ballroom");
    this.toggleCalendar("salsa");
    this.toggleCalendar("technique");
    return this.toggleCalendar("beginners_team");
  },
  toggleCalendar: function(name) {
    var newValues;
    newValues = {};
    if (this.state[name]) {
      $(this.refs.cal.getDOMNode()).fullCalendar("removeEventSource", {
        url: this.calendars[name],
        className: name
      });
      newValues[name] = false;
    } else {
      $(this.refs.cal.getDOMNode()).fullCalendar("addEventSource", {
        url: this.calendars[name],
        className: name
      });
      newValues[name] = true;
    }
    return this.setState(newValues);
  },
  render: function() {
    var calendars, cx;
    cx = React.addons.classSet;
    calendars = _.reduce(this.state, function(acc, active, name) {
      var classes, displayName;
      classes = {
        "btn": true,
        "btn-primary": true,
        "active": active
      };
      displayName = name.split("_").join(" ");
      acc.push(React.DOM.label( {className:cx(classes), key:name,
                    onClick:_.partial(this.toggleCalendar, name)}, 
                React.DOM.input( {type:"checkbox"} ), displayName
            ));
      return acc;
    }, [], this);
    return React.DOM.div( {className:"timetable"}, 
            React.DOM.div( {className:"btn-group btn-group-justified",
                    'data-toggle':"buttons"}, 
                calendars
            ),
            React.DOM.div( {className:"calendar", ref:"cal"} )
        );
  }
});

/*
//@ sourceMappingURL=calendar.js.map
*/