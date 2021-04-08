import React from 'react';

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercise}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercise}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercise}/>
    </>
  )
}

const Total = (props) => {
  const total = props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10
      },
      {
        name: "Using props to pass data",
        exercise: 7
      },
      {
        name: "State of a component",
        exercise: 14
      }
    ]
  }
  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}


export default App;
