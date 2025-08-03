import { useState } from 'react';
import PersonForm from './components/PersonForm';
import SearchPersons from './components/SearchPersons';
import PersonsList from './components/PersonsList';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '+1 404-893-1023' },
    { name: 'Ada Lovelace', number: '+1 404-893-1024' },
    { name: 'Dan Abramov', number: '+1 404-893-1025' },
    { name: 'Mary Poppendieck', number: '+1 404-893-1026' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(search.toLowerCase())
  })

  const displayedPersons = search === '' ? persons : filteredPersons

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

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
      <h1>Phonebook</h1>
      <hr/>
      <h2>Add a New Number:</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleAddPerson={handleAddPerson} />
      <hr/>
      <h2>Search: </h2>
      <SearchPersons search={search} handleSearch={handleSearch} />
      <hr/>
      <h2>Numbers:</h2>
      <PersonsList persons={displayedPersons}/>
    </div>
  )
}

export default App