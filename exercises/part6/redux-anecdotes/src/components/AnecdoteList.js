import { connect } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { setNotifcation } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.addVote(anecdote) // add vote
    clearInterval(props.notification.timeout)
    props.setNotifcation(`You voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  setNotifcation,
  addVote
}

const mapStateToProps = ({anecdotes, filter, notification}) => {
  return {
    anecdotes: filter.length === 0
      ? anecdotes
      : anecdotes.filter(anecdote =>  anecdote.content.toLowerCase().includes(filter.toLowerCase())),
    notification
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)