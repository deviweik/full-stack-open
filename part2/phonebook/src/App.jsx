import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import SearchPersons from './components/SearchPersons';
import PersonsList from './components/PersonsList';
import PersonsService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    PersonsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
    PersonsService
      .create(newPerson)
      .then(res => {
        setPersons(persons.concat(res))
        setNewName('');
        setNewNumber('');
        console.log(`Added ${newPerson.name} to phonebook with number ${newPerson.number}`);
      })
  }

  const deletePerson = (id) => {
    return () => {
      if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
        PersonsService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))
            console.log(`Deleted person with id ${id}`);
          })
      }
    }
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
      <PersonsList persons={displayedPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App