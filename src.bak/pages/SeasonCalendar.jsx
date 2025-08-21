import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { apiPost } from "../utils/api";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function SeasonCalendar(){
  const [events,setEvents] = useState([]);

  const addEvent = async ()=>{
    const commodity=prompt("Commodity?");
    const start=prompt("Start date (YYYY-MM-DD)?");
    const end=prompt("End date (YYYY-MM-DD)?");
    if(!commodity||!start||!end) return;
    const ev={title:commodity,start:new Date(start),end:new Date(end)};
    setEvents([...events,ev]);
    try{
      await apiPost("/calendar/add",{commodity,start,end});
      await apiPost("/notify",{msg:`New calendar entry: ${commodity} ${start}${end}`});
    }catch(e){ console.error(e); }
  };

  return (
    <div style={{height:"600px"}}>
      <h2>Seasonal Calendar</h2>
      <button onClick={addEvent} className="btn btn-accent">+ Add Entry</button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{height:500, marginTop:10}}
      />
    </div>
  );
}