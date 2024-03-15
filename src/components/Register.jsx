
function RegisterForm() {

  return <form onSubmit={PostUser}>
    <div className="form-row" id="registerForm" >
      <div >
        <label htmlFor="inputName">Name</label>
        <input type="text" name="name" id="inputName" placeholder="Name" required />
      </div>
      <div>
        <label htmlFor="inputEmail4">Email</label>
        <input type="email" name="email" id="inputEmail4" placeholder="Email" required />
      </div>
      <div>
        <label htmlFor="inputPassword4">Password</label>
        <input type="password" name="password" id="inputPassword4" placeholder="Password" required />
      </div>
    </div>
    <div>
      <label htmlFor="inputUsername">Username</label>
      <input type="text" name="userName" id="inputUsername" placeholder="Username" required />
    </div>
    <div>
      <label htmlFor="inputAddress">Address</label>
      <input type="text" name="adress" id="inputAddress" required />
    </div>
    <div className="form-row">
      <div>
        <label htmlFor="inputCity">City</label>
        <input type="text" name="city" id="inputCity" required />
      </div>
      <div id="registerFormBottom">
        <label htmlFor="inputZip">Zip</label>
        <input type="text" name="zip" id="inputZip" required />
      </div>
    </div>

    <button type="submit" id="registerButton">START</button>
  </form>
}

async function PostUser(event) {
  event.preventDefault();
  try {
    const data = new FormData(event.target);
    const info = Object.fromEntries(data);
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    event.target.reset();
  } catch (error) {
    console.error("Error posting user:", error);

  }
}
export default RegisterForm