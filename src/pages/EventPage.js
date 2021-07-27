import React from 'react'
import Calendar from '../components/Calendar'
import eventData from '../json/calendarDummy.json'

function EventPage() {

    return (
        <div>
            <h1>Event Page</h1>
            <Calendar eventData={eventData}/>
        </div>
    )
}

export default EventPage
