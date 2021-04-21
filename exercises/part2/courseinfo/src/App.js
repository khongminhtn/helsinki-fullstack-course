const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Part = ({id, name, exercise}) => {
  return (
    <div key={id}>{name} {exercise}</div>
  )
}

const Content = ({course}) => {
  console.log(course.parts)
  return (
    <div>
      {
        course.parts.map(parts => <div>{parts.name} {parts.exercises}</div>)
      }
    </div>
  )
}

const SumExercise = ({course}) => {
  const total = course.parts.reduce((s, {exercises}) => {
    return s += exercises
  }, 0)

  return <div><b>total of {total} exercises</b></div>
}

const Course = (props) => {
  console.log(props.course)
  return(
    <div>
      {
        props.course.map(course =>
          <div key={course.name}>
            <Header name={course.name}/>
            <Content course={course}/>
            <SumExercise course={course}/>
          </div>)
      }
      
      
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return <Course course={courses}/>
}

export default App;
