import { useState, useEffect, useContext } from 'react'
import RegisterForm from "../components/Register.jsx"
import { GlobalContext } from '../components/GlobalContext.jsx'


export default function Login() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(true)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const { setIsLoggedIn } = useContext(GlobalContext)

  useEffect(() => {

    async function load() {
      try {
        const response = await fetch("/api/users")
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
      const user = users.find(user => user.email === loginData.email && user.password === loginData.password);

      if (user) {
        setIsLoggedIn(true)
        console.log('Successfully logged in:', user);
      } else {

        console.log('Invalid email or password');
      }
    } else {

      console.log('Registering...');


    }

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
      <h1>{login ? 'Login' : 'Register'}</h1>

      {login ? (

        <form onClick={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </div>
        </form>
      ) : (
        <RegisterForm />
      )}
      <h3 onClick={handleSwitchForm}>{!login ? 'Go To Login' : 'Go To Register'}</h3>


    </>
  );

}
