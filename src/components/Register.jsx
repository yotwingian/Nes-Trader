
function RegisterForm() {

  return <form onSubmit={PostUser}>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="inputName">Name</label>
        <input type="text" name="name" className="form-control" id="inputName" placeholder="Name" required />
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="inputEmail4">Email</label>
        <input type="email" name="email" className="form-control" id="inputEmail4" placeholder="Email" required />
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="inputPassword4">Password</label>
        <input type="password" name="password" className="form-control" id="inputPassword4" placeholder="Password" required />
      </div>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputUsername">Username</label>
      <input type="text" name="userName" className="form-control" id="inputUsername" placeholder="Username" required />
    </div>
    <div className="form-group">
      <label htmlFor="inputAddress">Address</label>
      <input type="text" name="adress" className="form-control" id="inputAddress" required />
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="inputCity">City</label>
        <input type="text" name="city" className="form-control" id="inputCity" required />
      </div>
      <div className="form-group col-md-2">
        <label htmlFor="inputZip">Zip</label>
        <input type="text" name="zip" className="form-control" id="inputZip" required />
      </div>
    </div>

    <button type="submit" className="btn btn-primary">Sign in</button>
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