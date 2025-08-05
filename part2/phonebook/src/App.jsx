import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './components/PersonForm';
import SearchPersons from './components/SearchPersons';
import PersonsList from './components/PersonsList';
import PersonsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

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

  const showAlert = (message, seconds) => {
    if (!seconds) {
      seconds = 5
    }
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, seconds * 1000)
  }

  const handleAddPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    console.log(existingPerson);
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        console.log(`${newName}'s number is already set to ${newNumber}`);
        alert(`${newName}'s number is already set to ${newNumber}`);
        return;
      } else if (
        window.confirm(`${newName} is already in the phonebook, replace the old number (${existingPerson.number}) with the new one (${newNumber})?`)
      ) {
        const updatedPerson = {...existingPerson, number: newNumber}
        PersonsService
          .update(existingPerson.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : res))
          })
          .catch(error => {
            console.error(`Error updating person: ${error}`);
            showAlert(`${existingPerson.name} has already been removed from the server`, 5);
            setPersons(persons.filter(person => person.id !== existingPerson.id));
            console.log(`Removed ${existingPerson.name} from phonebook due to error: ${error.message}`);
          })
        setNewName('');
        setNewNumber('');
        showAlert(`Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`, 3);
        console.log(`Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`);
        return;
      } else {
        console.log(`Did not update ${newName}'s number`);
        return;
      }
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
        showAlert(`Added ${newPerson.name} to phonebook with number ${newPerson.number}`, 3);
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
            showAlert(`Deleted person with id ${id}`, 3);
            console.log(`Deleted person with id ${id}`);
          })
      }
    }
  }

  return (
    <div style={{margin: '4em'}}>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>
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