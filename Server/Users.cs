namespace Server;

using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

public class Users
{
  public record UserCredentials(string Username, string Password);
  public static IResult GetUser([FromBody] UserCredentials credentials, State state)
  {
    string query = "SELECT username, password FROM users WHERE username = @username AND password = @password";
    var reader = MySqlHelper.ExecuteReader(state.DB, query, new[] {
        new MySqlParameter("@username", credentials.Username),
        new MySqlParameter("@password", credentials.Password)
    });

    Console.WriteLine("Username: " + credentials.Username);
    Console.WriteLine("Password: " + credentials.Password);

    if (reader.Read())
    {
      return TypedResults.Ok(new UserCredentials(
          reader.GetString("username"),
          reader.GetString("password")
      ));
    }
    else
    {
      return TypedResults.NotFound("Wrong username or password!");
    }
  }



}

