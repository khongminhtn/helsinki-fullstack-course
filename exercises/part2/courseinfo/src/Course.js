const Header = (props) => {
    return <h1>{props.name}</h1>
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

export default Course