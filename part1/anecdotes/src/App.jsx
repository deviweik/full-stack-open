import { useState } from 'react'
import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const registerVote = (index) => {
    const newVotes = [...votes]
    newVotes[index] += 1
    setVotes(newVotes)
  }

  return (
    <>
      <h1>Anecdote of the Day:</h1>
      <div className='anecdote'>
        {anecdotes[selected]}
      </div>
      <div>
        Votes: {votes[selected]}
      </div>
      <div>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Next Anecdote</button>
      </div>
      <div>
        <button onClick={() => registerVote(selected)}>Vote</button>
      </div>
      <h1>Anecdote with the Most Votes:</h1>
      <div className='anecdote'>
        {anecdotes[votes.indexOf(Math.max(...votes))]}
      </div>
      <div>
        Votes: {Math.max(...votes)}
      </div>
    </>
  )
}

export default App