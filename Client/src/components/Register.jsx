
function RegisterForm() {

  return <form onSubmit={PostUser}>
    <div className="form-row" id="registerForm" >
      <div>
        <label htmlFor="inputUsername">Username</label>
        <div>
          <input type="text" name="userName" id="inputUsername" placeholder="Username" required />
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
  const formData = new FormData(event.target);
  // const info = Object.fromEntries(formData);

  // try {
  await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  //   if (response.ok) {
  //     console.log('User registered successfully.');
  event.target.reset(); // Reset the form
  //   } else {
  //     console.error('Failed to register user. Server returned status:', response.status);
  //   }
  // } catch (error) {
  //   console.error('Error posting user:', error);
  // }
}
export default RegisterForm