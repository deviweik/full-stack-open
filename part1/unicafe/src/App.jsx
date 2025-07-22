import {useState} from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </>
    )
  }
  const average = (good - bad) / total || 0
  const percentPositive = (good / total) * 100 || 0
  return (
    <>
      <h1>Statistics</h1>
      <h3>Feedback Summary:</h3>
      <table>
        <tbody>
          <tr>
            <th>Response</th>
            <th>Count</th>
          </tr>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
      {/* <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} /> */}
      <h3>Advanced Statistics:</h3>
      <table>
        <tbody>
          <tr>
            <th>Stat Type</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Total Responses</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{average.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Percent Positive</td>
            <td>{`${percentPositive.toFixed(2)}%`}</td>
          </tr>
        </tbody>
      </table>
      {/* <StatisticsLine text="Total Responses" value={total} />
      <StatisticsLine text="Average" value={average.toFixed(2)} />
      <StatisticsLine text="Percent Positive" value={`${percentPositive.toFixed(2)}%`} /> */}
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App