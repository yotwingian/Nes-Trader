namespace Server;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

public class Users
{
  public record LoginData(string Username, string Password);
  public record User(string Username);

  public static async Task<IResult> Login([FromBody] LoginData user, State state, HttpContext ctx)
  {
    string query = "SELECT username, password FROM users WHERE username = @username AND password = @password";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [
      new ("@username", user.Username),
      new ("@password", user.Password)
    ]);

    if (reader.Read())
    {
      string username = reader.GetString("username");

      await ctx.SignInAsync("nes-trader.user", new ClaimsPrincipal(
          new ClaimsIdentity(
            [new Claim(ClaimTypes.NameIdentifier, username)],
              "nes-trader.user"
          )
      ));
      return TypedResults.Ok(new User(username));
    }
    else
    {
      return TypedResults.NotFound("Wrong username or password!");
    }
  }

}
