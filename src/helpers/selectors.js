export function getInterview(state, interviewObject) {
  if (typeof interviewObject !== 'object') {
    return []
  }

  if (interviewObject === null) {
    return null
  }

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