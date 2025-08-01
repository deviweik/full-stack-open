const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <> 
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      ))}
    </>
  )
}

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p>
        <b>Total Number of exercises:</b> {totalExercises}
      </p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </>
  )
}

export default Course