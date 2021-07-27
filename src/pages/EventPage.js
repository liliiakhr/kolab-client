import React, { useState, useEffect, useRef, useContext } from 'react';
import eventData from '../json/calendarDummy.json'
import NavBar from '../components/Navbar'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import API_URL from '../config';
import axios from 'axios';
import userContext from '../contexts/UserContext';

function EventPage() {

    const [events, setEvents] = useState(null)
    const [calendarEvents, setCalendarEvents] = useState(null)
    const {user} = useContext(userContext)

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(`${API_URL}/api/events/all`, {withCredentials: true})
                setCalendarEvents(formatEvents(response.data))
                setEvents(response.data)
            }
            catch(error) {
                console.log(error)
            }
        })()
    }, [])

    const formatEvents = (eventData) => {
        let formattedEventData = eventData.map(event => {
            const { name, start, end, _id, groupOrigin: { name: groupName, _id: eventGroupOriginId  }, users} = event;
            
            let eventUserIds = users.map(user => user._id)
            let userGroupIds = user.groups.map(group => group._id)
            let color = '' 

            if (eventUserIds.includes(user._id)) {
                // Events the user participates in
                color = "green";
            }
            else if (userGroupIds.includes(eventGroupOriginId)) {
                // Events from user's groups that user doesn't participate in
                color = "blue";
            }
            else {
                // All other events
                color = "purple";
            }

            return {
                title: `${name} (${groupName} group)`,
                start,
                end, 
                id: _id,
                color
            }
        })
        return formattedEventData
    }

    const calendarRef = useRef();
 
    console.log(calendarRef)
    // let dateCalendar = calendarRef.fullCalendar(‘getDate’)

    const handleEventClick = (event) => {
        // This is how you access the the title via eventClickd
        console.log(event.event._def.publicId)
    }

    const handleMyEvents = (type) => {
        console.log("MY EVENTS RUNS", type)
    }

    return (
        <NavBar >
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                // initialView="dayGridMonth"
                initialView="timeGridWeek"
                events={calendarEvents}
                showNonCurrentDates={false}
                ref={calendarRef}
                date
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'MyEventBtn GroupEventBtn AllEventBtn ChangeViewMonth ChangeViewWeek'
                  }}
                  editable={true}    // Allows to be clickable
                  selectable={true}  // Allows to use useRef
                //   selectMirror={true}
                eventClick={handleEventClick}
                customButtons={{
                    MyEventBtn: {
                        text: "My Events",
                        click() {
                            handleMyEvents('own')
                        }
                    },
                    GroupEventBtn: {
                        text: "Group Events",
                        click() {
                            handleMyEvents('group')
                        }
                    },
                    AllEventBtn: {
                        text: "All Events",
                        click() {
                            handleMyEvents('all')
                        }
                    },
                    ChangeViewMonth: {
                        text: "Month View",
                        click() {

                            const calendar = calendarRef.current;
                            if (calendar) {
                                const calendarApi = calendar.getApi();
                                calendarApi.changeView("dayGridMonth")
                            }
                        }
                    },
                    ChangeViewWeek: {
                        text: "Week View",
                        click() {

                            const calendar = calendarRef.current;
                            if (calendar) {
                                const calendarApi = calendar.getApi();
                                calendarApi.changeView("timeGridWeek")
                            }
                        }
                    },
                }}
            />
        </NavBar>

    )
}

export default EventPage
