import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map((person) => (
    <InterviewerListItem
      key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === props.value}
      setInterviewer={() => props.onChange(person.id)}
      {...person} />
  ))

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}

// changing: <li onClick={() => props.setInterviewer(props.id)} className={interviewerClass}>
