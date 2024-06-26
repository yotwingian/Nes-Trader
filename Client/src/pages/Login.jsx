import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "../components/GlobalContext.jsx"
import RegisterForm from "../components/Register.jsx"

export default function Login() {

  const [login, setLogin] = useState(true)
  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  })
  const { setIsLoggedIn, setUser } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [message, setMessage] = useState()

  useEffect(() => {
    if (message) {

      const timer = setTimeout(() => {
        setMessage(null)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [message])

  const handleSwitchForm = () => {
    setLogin((login) => (!login))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })

    const data = await response.json();

    if (data.username) {
      const user = data.username
      setUser(user)
      setTimeout(() => {
        if (user) {
          setIsLoggedIn(true)
          navigate('/')
        }
      })

    } else {
      setMessage(data)
    }

    setLoginData({
      userName: '',
      password: '',
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLoginData(loginData => ({
      ...loginData,
      [name]: value
    }))
  }

  return (
    <>
      <h1 id="h1-login">{login ? 'Select Player' : 'New Player'}</h1>

      {login ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputEmail3" className='inputEmail3'>Player Name</label>
            <div>
              <input
                type="text"
                className="inputEmail3"
                id="userName"
                placeholder="Player Name"
                name="userName"
                value={loginData.userName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div >
            <label htmlFor="inputPassword3" className="inputPassword3">Password</label>
            <div>
              <input
                type="password"
                className="inputPassword3"
                id="password"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>


          <button type="submit" id="loginButton" >SELECT</button>
          {message && <div className="notificationMessage1" id="loginMessage">{message}</div>}
        </form>
      ) : (
        <RegisterForm />
      )}
      <h3 id='gotoRegister' onClick={handleSwitchForm}>{!login ? 'Select Player' : 'New Player'}</h3>
    </>
  )

}
