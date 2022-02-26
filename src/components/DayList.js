import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days
  const parsedDays = days.map((item) => (
    <DayListItem
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.name === props.value}
      setDay={props.onChange}
      // {...item}
    />
  ));
  return <ul>{parsedDays}</ul>;
}


// [
//   {
//   id: 1,
//   name: "Monday",
//   appointments: [
//     1,
//     2,
//     3,
//     4,
//     5
//   ],
//   interviewers: [
//     1,
//     3,
//     4,
//     8,
//     10
//   ],
//   spots: 3
//   },
// ]

// <DayListItem
// key={props.id} 
// name={props.name} 
// spots={props.spots} 
// selected={props.name === props.value}
// setDay={props.onChange}
// />