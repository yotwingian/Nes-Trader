import { useState, useEffect } from 'react'


export default function Login() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(true)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

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
  console.log(users)

  const handleSwitchForm = () => {
    setLogin((prevRegister) => !prevRegister);

  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (login) {
      const user = users.find(user => user.email === loginData.email && user.password === loginData.password);

      if (user) {

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
    setLoginData(prevLoginData => ({
      ...prevLoginData,
      [name]: value
    }));
  };


  return (
    <>
      <h1>{login ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
        {login ? (
          <>
            <div cclassName="form-group row">
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
          </>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputName">Name</label>
                <input type="text" className="form-control" id="inputName" placeholder="Name" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputUsername">Username</label>
              <input type="text" className="form-control" id="inputUsername" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </>
        )}
        <h3 onClick={handleSwitchForm}>{!login ? 'Go To Login' : 'Go To Register'}</h3>
      </form >

    </>
  );

}
