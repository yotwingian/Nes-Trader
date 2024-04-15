const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  const remaining = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds
  const thenDate = new Date((Date.now()) + remaining * 1000)
  const thenMinutes = ((thenDate.getMinutes() < 10 ? '0' : '') + thenDate.getMinutes())
  const thenHours = ((thenDate.getHours() < 10 ? '0' : '') + thenDate.getHours())

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (completed) {
    return <span>Game over!</span>
  } else if ((remaining < 604800) && (remaining >= 86400)) {
    return (
      <span>
        Game ends: {dayNames[thenDate.getDay()]} {thenHours}:{thenMinutes}
      </span>
    )
  }
  else if ((remaining >= 3600) && (remaining < 86400)) {
    return (
      <span>
        Game ends: {hours} h {minutes} m
      </span>
    )
  }

  else if ((remaining >= 60) && (remaining < 3600)) {
    return (
      <span style={{ color: "#DB3A3A" }}>
        Game ends: {minutes} m {seconds} s
      </span>
    )
  }

  else if (remaining < 60) {
    return (
      <span style={{ color: "#DB3A3A" }}>
        Game ends: {seconds} s
      </span>
    )
  }

  else {
    return (
      <span>
        Game ends: {thenDate.getDate()} {monthNames[thenDate.getMonth()]} {thenHours}:{thenMinutes}
      </span>
    )
  }

}

export default CountdownRenderer
