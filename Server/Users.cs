namespace Server;
using MySql.Data.MySqlClient;

public class Users
{
  public record User(string UserName, string Email, string Password, string Name, string Address, string City, string Zip, string Country);

  public static async Task Register(State state, User user)
  {
    MySqlCommand command = new("INSERT INTO users(username, email, password, name, address, city, zip, country) VALUES (@userName, @email, @password, @name, @address, @city, @zip, @country)", state.DB);
    command.Parameters.AddWithValue("@userName", user.UserName);
    command.Parameters.AddWithValue("@email", user.Email);
    command.Parameters.AddWithValue("@password", user.Password);
    command.Parameters.AddWithValue("@name", user.Name);
    command.Parameters.AddWithValue("@address", user.Address);
    command.Parameters.AddWithValue("@city", user.City);
    command.Parameters.AddWithValue("@zip", user.Zip);
    command.Parameters.AddWithValue("@country", user.Country);

    await command.ExecuteNonQueryAsync();
  }
}
