import { useState, useContext } from 'react'
import RegisterForm from "../components/Register.jsx"
import { GlobalContext } from '../components/GlobalContext.jsx'
import { useNavigate } from 'react-router-dom'; // Import useHistory

export default function Login() {

  const [login, setLogin] = useState(true)
  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  })
  const { setIsLoggedIn, setUser } = useContext(GlobalContext)
  const navigate = useNavigate();

  const handleSwitchForm = () => {
    setLogin((login) => (!login));
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    const userData = await response.json();

    if (loginData.userName === userData.username && loginData.password === userData.password) {
      const user = userData.username
      setUser(user)
      setTimeout(() => {
        if (user) {
          setIsLoggedIn(true)
          console.log('Successfully logged in:', user);
          navigate('/');
        }
      })

    } else {
      alert(userData)
      console.log('Invalid email or password');
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
            <label htmlFor="inputEmail3" className='inputEmail3'>Player Name</label>
            <div>
              <input
                type="text"
                className="inputEmail3"
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
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-sm-10">
            <button type="submit" id="loginButton" >SELECT</button>
          </div>
        </form>
      ) : (
        <RegisterForm />
      )}
      <h3 id='gotoRegister' onClick={handleSwitchForm}>{!login ? 'Select Player' : 'New Player'}</h3>
    </>
  );
}
