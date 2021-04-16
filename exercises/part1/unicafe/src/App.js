import React, { useState } from 'react'

const Button = (props) => {
  return(
    <button>Submit</button>
  )
}


const Statistic = (props) => {
  return(
    props.text === "good"
    ? <div>{props.value}</div>
    : props.text === "neutral"
    ? <div>{props.value}</div>
    : props.text === "bad"
    ? <div>{props.value}</div>
    : props.text === "all"
    ? <div>{props.value}</div>
    : props.text === "positive"
    ? <div>{props.value}%</div>
    : null
  )
}


const Statistics = (props) => {
  return (
    props.all === 0 
    ?<div>
      <div>No feedback given</div>
    </div>
    :<table>
      <tbody>
        <tr>
          <td>good</td>
          <td><Statistic text="good" value={props.good}/></td>
        </tr>
        <tr>
          <td>neutral</td>
          <td><Statistic text="neutral" value={props.neutral}/></td>
        </tr>
        <tr>
          <td>bad</td>
          <td><Statistic text="bad" value={props.bad}/></td>
        </tr>
        <tr>
          <td>all</td>
          <td><Statistic text="all" value={props.all}/></td>
        </tr>
        <tr>
          <td>positive</td>
          <td><Statistic text="positive" value={props.positive}/></td>
        </tr>
      </tbody>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setNewGood = () => setGood(good + 1)
  const setNewNeutral = () => setNeutral(neutral + 1)
  const setNewBad = () => setBad(bad + 1)

  const stats = {
    all: good + neutral + bad,
    positive: Math.floor((good/(good + neutral + bad)) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <>
        <button onClick={setNewGood}>good</button>
        <button onClick={setNewNeutral}>neutral</button>
        <button onClick={setNewBad}>bad</button>
      </>
      <h1>statistics</h1>
      <Statistics 
        all={stats.all}
        positive={stats.positive}
        good={good}
        neutral={neutral}
        bad={bad}
      />
      <Button/>
    </div>
  )
}


export default App;
