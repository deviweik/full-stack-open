import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './components/Note'

const App = ({ initialNotes }) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  console.log('render', notes.length, 'notes', notes)

  const addNote = ( e ) => {
    e.preventDefault()
    const noteObject = {
      content: newNote, 
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)
    if (window.confirm(`Delete note '${note.content}'?`)) {
      noteService
        .remove(id)
        .then(() => {
          setNotes(notes.filter(n => n.id !== id))
        })
        .catch(error => {
          alert(
            `The Note '${note.content}' was already deleted from the server`
          )
          setNotes(notes.filter(n => n.id !== id))
        })
    }
  }

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !==id ? n : returnedNote))
      })
      .catch(error => {
        alert(
          `The Note '${note.content}' was already deleted from the server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (e) => {
    // console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} 
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} placeholder="A new note..." onChange={handleNoteChange}/>
        <button type="submit">Add Note</button>
      </form>
    </div>
  )
}

export default App
