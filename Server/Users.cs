namespace Server;
using MySql.Data.MySqlClient;

public class Users
{
  public record UserCredentials(string Email, string Username);
  public static IResult GetUser(string Email, string Password, State state)
  {
    string query = "SELECT email, username FROM users WHERE email = @email AND password = @password";
    var reader = MySqlHelper.ExecuteReader(state.DB, query, new[] {
    new MySqlParameter("@email", Email),
    new MySqlParameter("@password", Password) });

    Console.WriteLine("Username: " + Email);
    Console.WriteLine("Password: " + Password);

    if (reader.Read())
    {
      return TypedResults.Ok(new UserCredentials(
          reader.GetString("email"),
          reader.GetString("username")
      ));
    }
    else
    {
      return TypedResults.NotFound("Item not found");
    }
  }


}

