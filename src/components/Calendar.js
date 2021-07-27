import React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 

function Calendar({eventData}) {
    
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={eventData}
                />
        </div>
    )
}

export default Calendar
