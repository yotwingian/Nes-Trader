import { useState, useEffect, useContext } from 'react'
import RegisterForm from "../components/Register.jsx"
import { GlobalContext } from '../components/GlobalContext.jsx'
import { useNavigate } from 'react-router-dom'; // Import useHistory

export default function Login() {

  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(true)
  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  })
  const { setIsLoggedIn } = useContext(GlobalContext)
  const { user, setUser } = useContext(GlobalContext)
  const navigate = useNavigate();

  useEffect(() => {

    async function load() {
      try {
        const response = await fetch("/api/users/")
        const userData = await response.json()
        setUsers(userData)
        console.log(userData)
      } catch (error) {
        console.error("Error message: ", error)
      }
    }
    load()

  }, [])


  const handleSwitchForm = () => {
    setLogin((login) => (!login));

  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (login) {
      const user = users.find(user => user.userName === loginData.userName && user.password === loginData.password)
      setUser(user)
      setTimeout(() => {
        if (user) {
          setIsLoggedIn(true)
          console.log('Successfully logged in:', user);
          navigate('/');

        } else {

          console.log('Invalid email or password');

        }
      })

    } else {

      console.log('Registering...');


    }
    setLoginData({
      userName: '',
      password: '',
    })


  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData(loginData => ({
      ...loginData,
      [name]: value
    }));
  };


  return (
    <>
      <h1>{login ? 'Select Player' : 'New Player'}</h1>

      {login ? (

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="inputEmail3" id='inputEmail3'>Email</label>
            <div>
              <input
                type="text"
                id="inputEmail3"
                placeholder="Player Name"
                name="userName"
                value={loginData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div >
            <label htmlFor="inputPassword3" id="inputPassword3">Password</label>
            <div>
              <input
                type="password"
                id="inputPassword3"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div id='loginInput'>
            <div className="col-sm-10">
              <button type="submit" id="loginButton" >SELECT</button>
            </div>
          </div>
        </form>
      ) : (
        <RegisterForm />
      )}
      <h3 id='gotoRegister' onClick={handleSwitchForm}>{!login ? 'Select Player' : 'New Player'}</h3>

    </>
  );

}
