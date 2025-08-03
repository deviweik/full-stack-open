import { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleAddName = (e) => {
    e.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
      
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    console.log(`Added ${newPerson.name} to phonebook`);
  }

  return (
    <div style={{margin: '4em'}}>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddName} style={{display: 'flex', flexDirection: 'column'}}>
        <div >
          <label>Name: </label>
          <input 
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='Enter name' 
          />
        </div>
        <div style={{marginTop: '1em'}}>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;