const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, handleAddPerson }) => {
  return (
    <>
      <h2>Add a New Number:</h2>
      <form onSubmit={handleAddPerson} style={{display: 'flex', flexDirection: 'column'}}>
        <div >
          <label >Name: </label>
          <input 
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='Enter name' 
          />
        </div>
        <div>
          <label>Number: </label>
          <input 
            type='text'
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder='Enter number' 
          />
        </div>
        <div style={{marginTop: '1em'}}>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm;