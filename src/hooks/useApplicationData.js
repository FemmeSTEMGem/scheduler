import React from "react";
import "components/Application.scss";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers:{}
  })

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        setState({
        ...state,
        appointments
        })
      })

  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          interview: null
        })      
      })
  }

  useEffect(() => {
    Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview};
}