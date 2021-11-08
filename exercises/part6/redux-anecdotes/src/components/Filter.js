import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducers'
import ConnectAnecdoteList from './AnecdoteList'

const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterAnecdotes(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)

