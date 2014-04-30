`/** @jsx React.DOM */`

React = require "react"
_ = require "lodash"
$ = require "jquery"
require "bootstrap"
require "fullcalendar"
require "gcal"

googleCalendarBase = "https://www.google.com/calendar/feeds/"
googleCalendarSuffix = "%40group.calendar.google.com/public/basic"

Calendar = React.createClass
    calendars: _.reduce(
        casual_ballroom: "olr3earjdohc3mjhb32092da4s"
        salsa: "75g92duhl999rkvdi2v6dmls14"
        technique: "0hu43sj0f9po3p64o4cck8rco0"
        beginners_team: "37vfmbf5b8intk85utod6o23bc"
        team: "d2nicj15qdd1oacuvhftq3csg4"
        rooms: "m7s6e2b9f8onjl6nn16tsisf6c"
    , (acc, address, name) ->
        acc[name] = googleCalendarBase + address + googleCalendarSuffix
        return acc
    , {}, @)

    getInitialState: ->
        calendarNames = _.keys(@calendars)
        return _.zipObject calendarNames,
            (false for x in _.range(_.size(calendarNames)))

    componentDidMount: (root) ->
        $(".btn", root).button()
        $(@refs.cal.getDOMNode()).fullCalendar
            firstDay: 1
            weekMode: 'liqiud'
        @toggleCalendar "casual_ballroom"
        @toggleCalendar "salsa"
        @toggleCalendar "technique"
        @toggleCalendar "beginners_team"

    toggleCalendar: (name) ->
        newValues = {}
        if this.state[name]
            $(@refs.cal.getDOMNode())
                .fullCalendar "removeEventSource",
                    url: @calendars[name]
                    className: name
            newValues[name] = false
        else
            $(@refs.cal.getDOMNode())
                .fullCalendar "addEventSource",
                    url: @calendars[name]
                    className: name
            newValues[name] = true

        @setState newValues

    render: ->
        cx = React.addons.classSet
        calendars = _.reduce this.state, (acc, active, name) ->
            classes =
                "btn": true
                "btn-primary": true
                "active": active

            displayName = name.split("_").join(" ")
            acc.push `<label className={cx(classes)} key={name}
                    onClick={_.partial(this.toggleCalendar, name)}>
                <input type="checkbox" /> {displayName}
            </label>`
            return acc
        , [], @

        return `<div className="timetable">
            <div className="btn-group btn-group-justified"
                    data-toggle="buttons">
                {calendars}
            </div>
            <div className="calendar" ref="cal" />
        </div>`

module.exports = Calendar
