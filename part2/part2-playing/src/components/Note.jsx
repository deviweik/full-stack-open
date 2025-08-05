const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'Remove Importance' : 'Make Important'

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote}>Delete</button>
    </li>
  )
}

export default Note