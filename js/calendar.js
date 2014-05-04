/** @jsx React.DOM */;
var $, Calendar, React, googleCalendarBase, googleCalendarSuffix, moment, _;

React = require("react");

_ = require("lodash");

$ = require("jquery");

moment = require("moment");

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
    var calRef, defaultView, narrow, viewName,
      _this = this;
    $(".btn", root).button();
    defaultView = localStorage.getItem("ic-dance-view") || "month";
    narrow = window.innerWidth < 450;
    viewName = defaultView;
    if (narrow) {
      defaultView = "agendaDay";
    }
    calRef = $(this.refs.cal.getDOMNode());
    calRef.fullCalendar({
      firstDay: 1,
      weekMode: "liqiud",
      timeFormat: "h(:mm)A",
      minTime: moment.duration("09:00:00"),
      maxTime: moment.duration("24:00:00"),
      defaultView: defaultView,
      height: 650,
      windowResize: function(v) {
        if (window.innerWidth < 450) {
          narrow = true;
          calRef.fullCalendar("changeView", "agendaDay");
        } else {
          if (narrow) {
            narrow = false;
            calRef.fullCalendar("changeView", viewName);
          }
          viewName = v.name;
        }
        return calRef.fullCalendar("render");
      },
      header: {
        left: "title",
        center: "",
        right: "today month,agendaWeek prev,next"
      },
      viewRender: function(view, el) {
        var saveName;
        saveName = view.name;
        if (view.name === "agendaDay") {
          saveName = "month";
        }
        return localStorage.setItem("ic-dance-view", saveName);
      }
    });
    $(window).resize(_.debounce(function() {
      return _this.forceUpdate();
    }, 500));
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
    var changeCalendar, eventName, newValues, setVisible,
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
    eventName = this.state[name] ? "remove" : "add";
    eventName += "EventSource";
    setVisible = !this.state[name];
    changeCalendar(eventName, setVisible);
    return this.setState(newValues, this.saveStateStorage);
  },
  render: function() {
    var buttonGroups, calendars, cx;
    cx = React.addons.classSet;
    calendars = _.map(this.state, function(active, name) {
      var classes, displayName;
      classes = {
        "btn": true,
        "btn-primary": true,
        "active": active
      };
      displayName = name.split("_").join(" ");
      return React.DOM.label( {className:cx(classes), key:name,
                    onClick:_.partial(this.toggleCalendar, name)}, 
                React.DOM.input( {type:"checkbox"} ), " ", displayName
            );
    }, this);
    if (window.innerWidth < 550) {
      calendars = _.groupBy(calendars, function(cal, idx) {
        return idx < 2;
      });
    } else {
      calendars = [calendars];
    }
    buttonGroups = _.map(calendars, function(cals, idx) {
      return React.DOM.div( {className:"btn-group btn-group-justified",
                        'data-toggle':"buttons", key:idx}, 
                cals
            );
    });
    return React.DOM.div( {className:"timetable"}, 
            buttonGroups,
            React.DOM.div( {className:"calendar", ref:"cal"} )
        );
  }
});

module.exports = Calendar;

/*
//@ sourceMappingURL=calendar.js.map
*/