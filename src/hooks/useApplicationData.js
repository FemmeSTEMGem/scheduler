import React from "react";
import "components/Application.scss";
import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })

  const setDay = day => setState({ ...state, day });

  function updateSpots(newAppointments) {
    return state.days.map((eachDay) => {
      let freeSpots = 0
      
      for (let appID of eachDay.appointments) {
        if (!newAppointments[appID].interview) {
          freeSpots++
        }
      }
      return {...eachDay, spots: freeSpots}
    })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments)

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
        ...state,
        appointments,
        days
        })
      })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments)

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
        ...state,
        appointments,
        days
        })
      })
  }

  useEffect(() => {
    Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview};
}