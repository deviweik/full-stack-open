const PersonsList = ({ persons }) => {
  return (
    <>
      <h2>Numbers:</h2>
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
    </>
  )
}

export default PersonsList;