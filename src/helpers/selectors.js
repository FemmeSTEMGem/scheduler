export function getInterview(state, interviewObject) {

  if (typeof interviewObject !== 'object') {
    return []
  }

  if (interviewObject === null) {
    return null
  }
  console.log("interviewObject: ", interviewObject)

  let interviewerID = interviewObject.interviewer
  let interviewer = state.interviewers[interviewerID]
  
  return {...interviewObject, interviewer}
  
}


export function getAppointmentsForDay(state, day) {
  let appts = []
  const apptsList = []

  state.days.forEach((element) => {
    if (element.name === day) {
      appts = element.appointments
    }
  })

  appts.forEach((value) => {
    if (state.appointments[value]) {
      apptsList.push(state.appointments[value])
    }
  })
  return apptsList
}


export function getInterviewersForDay(state, day) {

  let interviewers = []
  let interviewersList = []

  state.days.forEach((element) => {
    if (element.name === day) {
      interviewers = element.interviewers
    }
  })

  interviewers.forEach((value) => {
    if (state.interviewers[value]) {
      interviewersList.push(state.interviewers[value])
    }
  })

  return interviewersList
}


// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// }

// export function getInterviewersForDay(state, day) {
  
//   const apptsList = getAppointmentsForDay(state, day)
//   let interviewers = []
//   let interviewersList = []

//   apptsList.forEach((element) => {
//     if (element.interview !== null) {
//       interviewers.push(element.interview.interviewer)
//     }
//   })

//   interviewers.forEach((value) => {
//     if (state.interviewers[value]) {
//       interviewersList.push(state.interviewers[value])
//     }
//   })

//   return interviewersList
// }