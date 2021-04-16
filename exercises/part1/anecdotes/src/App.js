import React, {useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  const numberGenerator = () => {setSelected(Math.floor((Math.random() * anecdotes.length)))}
  const pointsUpdate = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <>{anecdotes[selected]}</><br/>
      <>has {points[selected]} votes</><br/>
      <button onClick={pointsUpdate}>vote</button>
      <button onClick={numberGenerator}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[points.indexOf(Math.max.apply(null, points))]} has {Math.max.apply(null, points)} votes
    </div>
  )
}
export default App;
