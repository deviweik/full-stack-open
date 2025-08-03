import { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '+1 404-893-1023' },
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
      
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
    console.log(`Added ${newPerson.name} to phonebook with number ${newPerson.number}`);
  }

  return (
    <div style={{margin: '4em'}}>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson} style={{display: 'flex', flexDirection: 'column'}}>
        <div >
          <label>Name: </label>
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
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) => (
            <tr key={person.name}>
              <td style={{paddingRight: '1em'}}>{person.name}: </td>
              <td>{person.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;