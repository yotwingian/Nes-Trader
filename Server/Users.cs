namespace Server;
using MySql.Data.MySqlClient;

public class Users
{
  public record User(string Username, string Email, string Password, string Name, string Address, string City, string Zip, string Country);

  public static IResult Register(User user, State state)
  {

    var result = MySqlHelper.ExecuteScalar(state.DB, "INSERT INTO users (username, email, password, name, address, city, zip, country) VALUES (@Username, @Email, @Password, @Name, @Address, @City, @Zip, @Country); RETURNING LAST_INSERT_ID();",
    [new("@Username", user.Username), new("@Email", user.Email), new("@Password", user.Password), new("@Name", user.Name), new("@Address", user.Address), new("@City", user.City), new("@Zip", user.Zip), new("@Country", user.Country)]
);

    if (result is int id)
    {
      // return to client/frontend
      return TypedResults.Created(id.ToString());
    }
    else
    {
      // return to client/frontend
      return TypedResults.Problem("Something went wrong");
    }

    // MySqlCommand command = new("INSERT INTO users(username, email, password, name, address, city, zip, country) VALUES (@Username, @email, @password, @name, @address, @city, @zip, @country)", state.DB);
    // command.Parameters.AddWithValue("@Username", user.Username);
    // command.Parameters.AddWithValue("@Email", user.Email);
    // command.Parameters.AddWithValue("@Password", user.Password);
    // command.Parameters.AddWithValue("@Name", user.Name);
    // command.Parameters.AddWithValue("@Address", user.Address);
    // command.Parameters.AddWithValue("@City", user.City);
    // command.Parameters.AddWithValue("@Zip", user.Zip);
    // command.Parameters.AddWithValue("@Country", user.Country);

    // await command.ExecuteNonQueryAsync();
  }

}

