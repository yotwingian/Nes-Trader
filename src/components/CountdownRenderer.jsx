const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {

  if (completed) {
    return <span>Game over!</span>
  } else {
    return (
      <span>
        {days} days, {hours} hours, {minutes} minutes and {seconds} seconds
      </span>
    )
  }
  
}

export default CountdownRenderer
