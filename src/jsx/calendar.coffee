`/** @jsx React.DOM */`

React = require "react"
_ = require "lodash"
$ = require "jquery"
moment = require "moment"
require "bootstrap"
require "fullcalendar"
require "gcal"

googleCalendarBase = "https://www.google.com/calendar/feeds/"
googleCalendarSuffix = "%40group.calendar.google.com/public/basic"

Calendar = React.createClass
    calendars: _.reduce(
        casual_ballroom: ["olr3earjdohc3mjhb32092da4s"]
        salsa: ["75g92duhl999rkvdi2v6dmls14"]
        competitive: [["0hu43sj0f9po3p64o4cck8rco0", "competitive"],
            ["37vfmbf5b8intk85utod6o23bc", "beginners"],
            ["d2nicj15qdd1oacuvhftq3csg4", "team"]]
        rooms: ["m7s6e2b9f8onjl6nn16tsisf6c"]
    , (acc, address, name) ->
        acc[name] = _.map address, (cal) ->
            if cal instanceof Array
                [googleCalendarBase + cal[0] + googleCalendarSuffix, cal[1]]
            else
                googleCalendarBase + cal + googleCalendarSuffix
        return acc
    , {}, @)

    getInitialState: ->
        calendarNames = _.keys(@calendars)
        return _.zipObject calendarNames,
            (false for x in _.range(_.size(calendarNames)))

    componentDidMount: (root) ->
        $(".btn", root).button()
        defaultView = localStorage.getItem("ic-dance-view") || "month"
        narrow = window.innerWidth < 450
        viewName = defaultView
        if narrow
            defaultView = "agendaDay"

        calRef = $(@refs.cal.getDOMNode())
        calRef.fullCalendar
            firstDay: 1
            weekMode: "liqiud"
            timeFormat: "h(:mm)A"
            minTime: moment.duration "09:00:00"
            maxTime: moment.duration "24:00:00"
            defaultView: defaultView
            height: 650
            windowResize: (v) =>
                if window.innerWidth < 450
                    narrow = true
                    calRef.fullCalendar "changeView", "agendaDay"
                else
                    if narrow
                        narrow = false
                        calRef.fullCalendar "changeView", viewName
                    viewName = v.name
                calRef.fullCalendar "render"
            header:
                left:   "title"
                center: ""
                right:  "today month,agendaWeek prev,next"
            viewRender: (view, el) ->
                saveName = view.name
                if view.name is "agendaDay"
                    saveName = "month"
                localStorage.setItem "ic-dance-view", saveName

        $(window).resize _.debounce =>
            @forceUpdate()
        , 500
        @restoreFromStorage()

    restoreFromStorage: ->
        calendars = JSON.parse(localStorage.getItem "ic-dance-calendars")
        if not calendars?
            calendars = {}
            calendars["casual_ballroom"] = true
            calendars["salsa"] = true
            calendars["competitive"] = true

        _.each calendars, (enabled, name) ->
            @toggleCalendar name if enabled
        , @

    saveStateStorage: ->
        localStorage.setItem "ic-dance-calendars", JSON.stringify(@state)

    toggleCalendar: (name) ->
        newValues = {}
        changeCalendar = (evName, value) =>
            _.each @calendars[name], (cal) ->
                calendar = cal
                calClass = name
                if cal instanceof Array
                    calendar = cal[0]
                    calClass = cal[1]

                $(@refs.cal.getDOMNode())
                    .fullCalendar evName,
                        url: calendar
                        className: calClass
            , @
            newValues[name] = value

        eventName = if this.state[name] then "remove" else "add"
        eventName += "EventSource"
        setVisible = not this.state[name]
        changeCalendar eventName, setVisible

        @setState newValues, @saveStateStorage

    render: ->
        cx = React.addons.classSet
        calendars = _.map this.state, (active, name) ->
            classes =
                "btn": true
                "btn-primary": true
                "active": active

            displayName = name.split("_").join(" ")
            return `<label className={cx(classes)} key={name}
                    onClick={_.partial(this.toggleCalendar, name)}>
                <input type="checkbox" /> {displayName}
            </label>`
        , @

        # Too large text for 1 row
        if window.innerWidth < 550
            calendars = _.groupBy calendars, (cal, idx) ->
                return idx < 2
        else
            calendars = [calendars]

        buttonGroups = _.map calendars, (cals, idx) ->
            return `<div className="btn-group btn-group-justified"
                        data-toggle="buttons" key={idx}>
                {cals}
            </div>`

        return `<div className="timetable">
            {buttonGroups}
            <div className="calendar" ref="cal" />
        </div>`

module.exports = Calendar
