function RegisterForm() {

  return <form onSubmit={PostUser}>
    <div className="form-row" id="registerForm" >
      <div>
        <label htmlFor="inputUsername">Username</label>
        <div>
          <input type="text" name="username" id="inputUsername" placeholder="Username" required />
        </div>
      </div>
      <div>
        <label htmlFor="inputEmail4">Email</label>
        <div>
          <input type="email" name="email" id="inputEmail4" placeholder="Email" required />
        </div>
      </div>
      <div>
        <label htmlFor="inputPassword4">Password</label>
        <div>
          <input type="password" name="password" id="inputPassword4" placeholder="Password" required />
        </div>
      </div>
    </div>
    <div >
      <label htmlFor="inputName">Name</label>
      <div>
        <input type="text" name="name" id="inputName" placeholder="Name" required />
      </div>
    </div>
    <div>
      <label htmlFor="inputAddress">Address</label>
      <div>
        <input type="text" name="address" id="inputAddress" placeholder="Address" required />
      </div>
    </div>
    <div className="form-row">
      <div>
        <label htmlFor="inputCity">City</label>
        <div>
          <input type="text" name="city" id="inputCity" placeholder="City" required />
        </div>
      </div>
      <div id="registerFormBottom">
        <label htmlFor="inputZip">Zip</label>
        <div>
          <input type="text" name="zip" id="inputZip" placeholder="Zip" required />
        </div>
        <label htmlFor="country">Country</label>
        <div>
          <input type="text" name="country" id="country" placeholder="Country" required />
        </div>
      </div>
    </div>

    <button type="submit" id="registerButton">START</button>
  </form>
}

async function PostUser(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const info = Object.fromEntries(data);
  const response = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (response.ok) {
    alert("User has been successfully registered.");
  } else {
    const errorData = await response.json();
    alert("An error occurred while registering the user: " + errorData.message);
  }

  event.target.reset();
}

export default RegisterForm