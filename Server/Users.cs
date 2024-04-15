namespace Server;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

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

public class TestUsers
{
  public record UserCredentials(string Username, string Password);

  public static async Task<IResult> Login([FromBody] UserCredentials credentials, State state, HttpContext ctx)
  {
    string query = "SELECT username, password FROM users WHERE username = @username AND password = @password";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [
      new ("@username", credentials.Username),
      new ("@password", credentials.Password)
    ]);

    Console.WriteLine("Username: " + credentials.Username);
    Console.WriteLine("Password: " + credentials.Password);

    if (reader.Read())
    {
      string username = reader.GetString("username");
      string password = reader.GetString("password");
      Console.WriteLine("DB Username: " + username);
      Console.WriteLine("DB Password: " + password);

      await ctx.SignInAsync("nes-trader.user", new ClaimsPrincipal(
          new ClaimsIdentity(
              new Claim[]
              {
            new Claim(ClaimTypes.NameIdentifier, username),
              },
              "nes-trader.user"
          )
      ));
      return TypedResults.Ok(new UserCredentials(
          username,
          password
      ));
    }
    else
    {
      return TypedResults.NotFound("Wrong username or password!");
    }
  }
}

public class GPTUsers
{
  public record UserCredentials(string Username, string Password);

  public static async Task<IResult> GetUser([FromBody] UserCredentials credentials, State state, HttpContext ctx)
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
      string username = reader.GetString("username");
      string password = reader.GetString("password");

      // Generate a unique session ID for the user.
      string sessionId = Guid.NewGuid().ToString();

      await ctx.SignInAsync("Nes-Trader", new ClaimsPrincipal(
          new ClaimsIdentity(
              new Claim[]
              {
                        new Claim(ClaimTypes.NameIdentifier, sessionId),
              },
              "Nes-Trader"
          )
      ));

      return TypedResults.Ok(new UserCredentials(
          username,
          password
      ));
    }
    else
    {
      return TypedResults.NotFound("Wrong username or password!");
    }
  }
}

/* public class Auth
{
  public record LoginData(string Email, string Password);

  public static async Task<IResult> Login(LoginData user, State state, HttpContext ctx)
  {
    MySqlCommand cmd = new("select id, role from users where email = @Email and password = @Password", state.DB);

    cmd.Parameters.AddWithValue("@Email", user.Email);
    cmd.Parameters.AddWithValue("@Password", user.Password);

    using var reader = cmd.ExecuteReader();

    // Check if any are found, if none it returns false, if 1 or more, it gives access to them
    bool bIsFound = reader.Read();

    if (!bIsFound)
    {
      return TypedResults.Problem("No Such User Exists");
    }

    string id = reader.GetInt32("id").ToString();
    string role = reader.GetString("role");

    Console.WriteLine(id + ", " + role);
    await ctx.SignInAsync("opa23.teachers.foodcourt", new ClaimsPrincipal(
        new ClaimsIdentity(
            new Claim[]
            {
                    new Claim(ClaimTypes.NameIdentifier, id),
                    new Claim(ClaimTypes.Role, role),
            },
            "opa23.teachers.foodcourt"
        )
    ));
    return TypedResults.Ok("Signed in");
  }
} */
