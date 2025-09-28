import { useState, useEffect } from 'react'
import personsService from './services/persons'
import SearchPersons from './components/SearchPersons'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  const [persons, setPersons] = useState([])

  const [searchValue, setSearchValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    }).catch(error => {
      console.error('Error fetching persons:', error)
    })
  }, [])

  const handleAddPerson = async (e) => {
      e.preventDefault();
      const name = newName.trim()
      const number = newNumber.trim()
      const existingPerson = persons.find(person => person.name === name);
      if (existingPerson) {
        if (existingPerson.number === number) {
          console.log(`${name}'s number is already set to ${number}`);
          alert(`${name}'s number is already set to ${number}`);
          return;
        } else if (
          window.confirm(`${name} is already in the phonebook, replace the old number (${existingPerson.number}) with the new one (${newNumber})?`)
        ) {
          personsService
            .update(existingPerson.id, { ...existingPerson, number: number })
            .then(res => {
              setPersons(persons.map(p => p.id !== existingPerson.id ? p : res))
              setNewName('')
              setNewNumber('')
              // showAlert(`Updated ${res.name}'s number to ${res.number}`, 3)
              console.log(`Updated ${res.name}'s number to ${res.number}`)
            })
            .catch(error => {
              console.error(`Error updating person: ${error}`);
              // showAlert(`${existingPerson.name} has already been removed from the server`, 5);
              setPersons(persons.filter(p => p.id !== existingPerson.id));
              console.log(`Removed ${existingPerson.name} from phonebook due to error: ${error.message}`);
            })
          return;
        } else {
          console.log(`Did not update ${name}'s number`);
          return;
        }
      }
        
      personsService
        .create({ name: newName, number: newNumber })
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          // showAlert(`Added ${res.name} to phonebook with number ${res.number}`, 3)
          console.log(`Added ${res.name} to phonebook with number ${res.number}`)
        })
        .catch(error => {
          console.error('Error creating person:', error)
          // showAlert('Failed to add person. Please try again.', 5)
        })
    }
  
    const deletePerson = (id) => {
      return () => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
          personsService
            .remove(id)
            .then(() => {
              setPersons(persons.filter(person => person.id !== id))
              // showAlert(`Deleted person with id ${id}`, 3);
              console.log(`Deleted person with id ${id}`);
            })
        }
      }
    }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Find a Number</h2>
      <SearchPersons searchValue={searchValue} setSearchValue={setSearchValue} />
      <h2>Add a New Number</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <PersonsList persons={persons} searchValue={searchValue} />
    </div>
  )
}

export default App