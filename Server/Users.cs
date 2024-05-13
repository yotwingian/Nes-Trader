namespace Server;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

public class Users
{
  public record LoginData(string Username, string Password);
  public record User(string Username);

  public static async Task<IResult> Login(LoginData user, State state, HttpContext ctx)
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


  public record PostUserRecord(string Username, string Email, string Password, string Name, string Address, string City, string Zip, string Country);

  public static IResult Register(PostUserRecord user, State state)
  {
    string checkQuery = "SELECT COUNT(*) FROM users WHERE username = @username OR email = @email";
    MySqlParameter[] checkParameters = [new MySqlParameter("@username", user.Username), new MySqlParameter("@email", user.Email)];
    int existingCount = (int)MySqlHelper.ExecuteScalar(state.DB, checkQuery, checkParameters);

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

  public static IResult Delete(string user, State state)
  {
    string query = "DELETE FROM users WHERE username = @username";
    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [new("@username", user)]);

    if (result > 0)
    {
      return TypedResults.Ok("User was successfully deleted");
    }
    else
    {
      return TypedResults.NotFound("No user was deleted because no user was found");
    }
  }

}
