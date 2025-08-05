const PersonsList = ({ persons, deletePerson }) => {
  return (
    <>
      <table>
        <tbody>
          {persons.map((person) => (
            <tr key={person.name}>
              <td style={{paddingRight: '1em'}}>{person.name}: </td>
              <td>{person.number}</td>
              <td><button style={{"fontSize": '0.5em'}} onClick={deletePerson(person.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default PersonsList;