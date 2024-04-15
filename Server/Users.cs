namespace Server;
using MySql.Data.MySqlClient;

public class Users
{
  public record PostUserRecord(string Username, string Email, string Password, string Name, string Address, string City, string Zip );

  public static IResult Register(PostUserRecord user, State state)
  {

    // Insert the new user into the database
    string insertQuery = "INSERT INTO users (username, email, password, name, address, city, zip, country) VALUES (@username, @email, @password, @name, @address, @city, @zip )";
    MySqlParameter[] insertParameters = [
    new ("@username", user.Username),
    new ("@email", user.Email),
    new ("@password", user.Password),
    new ("@name", user.Name),
    new ("@address", user.Address),
    new ("@city", user.City),
    new ("@zip", user.Zip)
    ];

    try
    {
      int affectedRows = MySqlHelper.ExecuteNonQuery(state.DB, insertQuery, insertParameters);
      if (affectedRows > 0)
      {
        // The operation was successful
        return TypedResults.Ok("User has been successfully registered");
      }
      else
      {
        // The operation did not affect any rows
        return TypedResults.Problem("No data was inserted");
      }
    }
    catch (Exception ex)
    {
      // An exception occurred during the operation
      return TypedResults.Problem("An error occurred while registering the user: " + ex.Message);
    }
  }
}





    // // Check if the username or email already exists in the database
    // string checkQuery = "SELECT COUNT(*) FROM users WHERE username = @username OR email = @email";
    // MySqlParameter[] checkParameters = [ new MySqlParameter("@username", user.Username), new MySqlParameter("@email", user.Email) ];
    // long existingCount = (long)MySqlHelper.ExecuteScalar(state.DB, checkQuery, checkParameters);

    // // If the username or email already exists, return an error
    // if (existingCount > 0)
    // {
    //   return TypedResults.Problem("A user with this username or email already exists");
    // }