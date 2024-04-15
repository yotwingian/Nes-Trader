namespace Server;
using MySql.Data.MySqlClient;

public class Users
{
  public record PostUserRecord(string Username, string Email, string Password, string Name, string Address, string City, string Zip, string Country);

  public static IResult Register(PostUserRecord user, State state)
  {
    string checkQuery = "SELECT COUNT(*) FROM users WHERE username = @username OR email = @email";
    MySqlParameter[] checkParameters = [new MySqlParameter("@username", user.Username), new MySqlParameter("@email", user.Email)];
    long existingCount = (long)MySqlHelper.ExecuteScalar(state.DB, checkQuery, checkParameters);

    if (existingCount > 0)
    {
      return TypedResults.Problem("A user with this username or email already exists");
    }

    string insertQuery = "INSERT INTO users (username, email, password, name, address, city, zip, country) VALUES (@username, @email, @password, @name, @address, @city, @zip, @Country )";
    MySqlParameter[] insertParameters = [
    new ("@username", user.Username),
    new ("@email", user.Email),
    new ("@password", user.Password),
    new ("@name", user.Name),
    new ("@address", user.Address),
    new ("@city", user.City),
    new ("@zip", user.Zip),
    new ("@Country", user.Country)
    ];

    try
    {
      int affectedRows = MySqlHelper.ExecuteNonQuery(state.DB, insertQuery, insertParameters);
      if (affectedRows > 0)
      {
        return TypedResults.Ok("User has been successfully registered");
      }
      else
      {
        return TypedResults.Problem("No data was inserted");
      }
    }
    catch (Exception ex)
    {
      return TypedResults.Problem("An error occurred while registering the user: " + ex.Message);
    }
  }
}




