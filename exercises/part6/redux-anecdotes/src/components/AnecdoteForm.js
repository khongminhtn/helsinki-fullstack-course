import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotifcation} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.addAnecdote(content)
    props.setNotifcation(`You created ${content}`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotifcation
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)