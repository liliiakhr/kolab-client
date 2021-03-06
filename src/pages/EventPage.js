import React, { useState, useEffect, useRef, useContext } from 'react';
import NavBar from '../components/Navbar'
import EventCard from '../components/EventCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import API_URL from '../config';
import axios from 'axios';
import userContext from '../contexts/UserContext';
import { Button, ButtonGroup, Container, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { useTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';


function EventPage() {

    const [events, setEvents] = useState(null)
    const [calendarEvents, setCalendarEvents] = useState(null)
    const [filteredCalendarEvents, setFilteredCalendarEvents] = useState(null)
    const [showEvent, setShowEvent] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const {user} = useContext(userContext)
    const theme = useTheme();

    // Re do the format function after the event is set

    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(`${API_URL}/api/events/all`, {withCredentials: true})
                setCalendarEvents(formatEvents(response.data))
                setFilteredCalendarEvents(formatEvents(response.data))
                setEvents(response.data)
            }
            catch(error) {
                console.log(error)
            }
        })()
    }, [])

    const calendarRef = useRef();

    if (!user) {
        return <Redirect to={{
            pathname: "/",
            state: { renderLogin: true }
        }} />
    }

    const formatEvents = (eventData) => {
        let formattedEventData = eventData.map(event => {
            const { name, start, end, _id, groupOrigin: { name: groupName, _id: eventGroupOriginId  }, users} = event
            
            let eventUserIds = users.map(user => user._id)
            let userGroupIds = user.groups.map(group => group._id)
            let color = '' 

            if (eventUserIds.includes(user._id)) {
                // Events the user participates in
                color = `${theme.palette.primary.main}`;
            }
            else if (userGroupIds.includes(eventGroupOriginId)) {
                // Events from user's groups that user doesn't participate in
                color = `${theme.palette.secondary.main}`;
            }
            else {
                // All other events
                color = `${theme.palette.info.main}`;
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
 
    const handleEventClick = (event) => {
        // This is how you access the the title via eventClickd
        // event.event._def.publicId
        let selectedEventId = event.event._def.publicId

        let newEvent = events.filter(event => event._id === selectedEventId)[0]

        setSelectedEvent(newEvent)
        setShowEvent(true)
    }

    const handleMyEvents = (type) => {
        if (type === "all") {
            setFilteredCalendarEvents(calendarEvents)
        }
        if (type === "own") {
            let eventsFiltered = calendarEvents.filter(calendarEvent => {
                let event = events.filter(event => event._id === calendarEvent.id)[0]
                let eventUserIds = event.users.map(user => user._id)
                return eventUserIds.includes(user._id) 
            })
            setFilteredCalendarEvents(eventsFiltered)
        }
        if (type === "group") {
            let eventsFiltered = calendarEvents.filter(calendarEvent => {
                let event = events.filter(event => event._id === calendarEvent.id)[0]
                let groupOriginId = event.groupOrigin._id;
                let userGroupIds = user.groups.map(group => group._id)
                return userGroupIds.includes(groupOriginId) 
            })
            setFilteredCalendarEvents(eventsFiltered)
        }
    }

    const handleCloseShowEvent = () => {
        setShowEvent(false)
    }

    const handleEventStatusChanged = (changedEvent) => {
        let newEvents = [...events.filter(event => event._id !== changedEvent._id), changedEvent];
        setCalendarEvents(formatEvents(newEvents))
        setFilteredCalendarEvents(formatEvents(newEvents))
        setEvents(newEvents)
    }

    return (
        <NavBar >
            <Container style={{marginTop: "20px"}}>
            {
                showEvent &&
                (
                    <div className="popupOpacity" style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", width: "345px", justifyContent: "flex-end"}}>
                            <IconButton onClick={handleCloseShowEvent}>
                                <CloseIcon />
                            </IconButton> 
                        </div>
                        <EventCard eventData={selectedEvent} user={user} onEventStatusChanged={handleEventStatusChanged} />
                    </div>
                )
            }
            {
                !showEvent &&
                (
                    <>
                    <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center"}}>
                        <ButtonGroup variant="contained" color="secondary" style={{marginTop: "10px"}}>
                            <Button startIcon={<PersonIcon/>}onClick={() => handleMyEvents('own')}>My Events</Button>
                            <Button startIcon={<PeopleAltIcon/>}onClick={() => handleMyEvents('group')}>Events from my Groups</Button>
                            <Button startIcon={<EventAvailableIcon/>} onClick={() => handleMyEvents('all')}>All Events</Button>
                        </ButtonGroup>
                        <div className="event-legend-container">
                            <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                                <div style={{marginRight: "5px", backgroundColor: `${theme.palette.primary.main}`, width: "20px", height: "20px", borderRadius: "100%"}}></div>
                                <Typography>Scheduled events</Typography>
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                                <div style={{marginRight: "5px", backgroundColor: `${theme.palette.secondary.main}`, width: "20px", height: "20px", borderRadius: "100%"}}></div>
                                <Typography>My Group events</Typography>
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                                <div style={{marginRight: "5px", backgroundColor: `${theme.palette.info.main}`, width: "20px", height: "20px", borderRadius: "100%"}}></div>
                                <Typography>Other events</Typography>
                            </div>
                        </div>
                    </div>

                    <FullCalendar
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                        // initialView="dayGridMonth"
                        initialView="dayGridMonth"
                        events={filteredCalendarEvents}
                        showNonCurrentDates={false}
                        ref={calendarRef}
                        date
                        headerToolbar={{
                            left: '',
                            center: '',
                            right: 'ChangeViewMonth,ChangeViewWeek,prev,next,today'
                        }}
                        editable={true}    // Allows to be clickable
                        selectable={true}  // Allows to use useRef
                        //   selectMirror={true}
                        eventClick={handleEventClick}
                        customButtons={{
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
                    </>
                )
            }
            </Container>
        </NavBar>
    )
}

export default EventPage
