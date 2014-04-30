/** @jsx React.DOM */;
var $, Calendar, React, googleCalendarBase, googleCalendarSuffix, _;

React = require("react");

_ = require("lodash");

$ = require("jquery");

require("bootstrap");

require("fullcalendar");

require("gcal");

googleCalendarBase = "https://www.google.com/calendar/feeds/";

googleCalendarSuffix = "%40group.calendar.google.com/public/basic";

Calendar = React.createClass({displayName: 'Calendar',
  calendars: _.reduce({
    casual_ballroom: ["olr3earjdohc3mjhb32092da4s"],
    salsa: ["75g92duhl999rkvdi2v6dmls14"],
    competitive: [["0hu43sj0f9po3p64o4cck8rco0", "competitive"], ["37vfmbf5b8intk85utod6o23bc", "beginners"], ["d2nicj15qdd1oacuvhftq3csg4", "team"]],
    rooms: ["m7s6e2b9f8onjl6nn16tsisf6c"]
  }, function(acc, address, name) {
    acc[name] = _.map(address, function(cal) {
      if (cal instanceof Array) {
        return [googleCalendarBase + cal[0] + googleCalendarSuffix, cal[1]];
      } else {
        return googleCalendarBase + cal + googleCalendarSuffix;
      }
    });
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
      firstDay: 1,
      weekMode: "liqiud",
      aspectRatio: 1.8,
      timeFormat: "h(:mm)A",
      defaultView: localStorage.getItem("ic-dance-view") || "month",
      header: {
        left: "title",
        center: "",
        right: "today month,agendaWeek prev,next"
      },
      viewRender: function(view, el) {
        return localStorage.setItem("ic-dance-view", view.name);
      }
    });
    return this.restoreFromStorage();
  },
  restoreFromStorage: function() {
    var calendars;
    calendars = JSON.parse(localStorage.getItem("ic-dance-calendars"));
    if (calendars == null) {
      calendars = {};
      calendars["casual_ballroom"] = true;
      calendars["salsa"] = true;
      calendars["competitive"] = true;
    }
    return _.each(calendars, function(enabled, name) {
      if (enabled) {
        return this.toggleCalendar(name);
      }
    }, this);
  },
  saveStateStorage: function() {
    return localStorage.setItem("ic-dance-calendars", JSON.stringify(this.state));
  },
  toggleCalendar: function(name) {
    var changeCalendar, newValues,
      _this = this;
    newValues = {};
    changeCalendar = function(evName, value) {
      _.each(_this.calendars[name], function(cal) {
        var calClass, calendar;
        calendar = cal;
        calClass = name;
        if (cal instanceof Array) {
          calendar = cal[0];
          calClass = cal[1];
        }
        return $(this.refs.cal.getDOMNode()).fullCalendar(evName, {
          url: calendar,
          className: calClass
        });
      }, _this);
      return newValues[name] = value;
    };
    if (this.state[name]) {
      changeCalendar("removeEventSource", false);
    } else {
      changeCalendar("addEventSource", true);
    }
    return this.setState(newValues, this.saveStateStorage);
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
                React.DOM.input( {type:"checkbox"} ), " ", displayName
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

module.exports = Calendar;

/*
//@ sourceMappingURL=calendar.js.map
*/