import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'

export default function Calendar() {
  const [events, setEvents] = useState([])
  const [holidays, setHolidays] = useState({})

  const fetchHolidays = async () => {
    try {
      const response = await fetch('/api/holiday')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setHolidays(data)
    } catch (error) {
      console.error('Error fetching holidays:', error)
    }
  }

  const fetchEvents = async () => {
    try {
      console.log('fetchEvents')
      const response = await fetch('/api/event')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data)
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  useEffect(() => {
    // APIからデータ取得
    fetchHolidays()
    fetchEvents()
  }, [])

  const renderDayCellContent = (dayCellContent) => {
    if (dayCellContent.view.type !== 'dayGridMonth') return

    const dateStr = dayCellContent.date.toLocaleDateString('sv-SE')
    const holidayName = holidays[dateStr]
    const isHoliday = Boolean(holidayName)

    return (
      <>
        <span className={isHoliday ? 'holiday-number' : ''}>{dayCellContent.date.getDate()}</span>
        {isHoliday ? <span className="holiday-label">{holidayName}</span> : null}
      </>
    )
  }

  return (
    <div className="demo-app-main">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        headerToolbar= {{
          left: 'prev,next',
          center: 'title'
        }}
        allDaySlot={false}
        initialView="timeGridDay"
        events={events}
        height={'95vh'}
        locale={esLocale}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: 'short'
        }}
        slotMinTime={'07:00:00'}
        slotMaxTime={'22:00:00'}
        expandRows={true}
      />
    </div>
  )
}
