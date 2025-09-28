const PersonsList = ({ persons, searchValue }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase())).map((person) => 
                <div key={person.id}>{person.name} | {person.number}</div>)
            }
        </div>
    )
}

export default PersonsList