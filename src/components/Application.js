import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];



export default function Application(props) {
  // const [day, setDay] = useState("Monday")
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })



  const setDay = day => setState({ ...state, day });

  // const setDays = days => setState(prev => ({ ...prev, days }))

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const parsedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    )
  })

  useEffect(() => {
    Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log(all[0])
      console.log(all[1])
      console.log(all[2])
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    // setDays(response.data)
    })
  }, [])
  console.log(state.interviewers)


  // const [first, second, third] = all;

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          // days={days}
          // value={day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
      </section>
      
    </main>
  );
}

