namespace Server;
using MySql.Data.MySqlClient;

public class Items
{
  public record Item(string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice, int User);

  public static List<Item> All(State state)
  {
    List<Item> result = new();
    string query = "SELECT slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price, user  FROM items";
    MySqlCommand command = new(query, state.DB);
    using var reader = command.ExecuteReader();

    while (reader.Read())
    {
      result.Add(new(
        reader.GetString("slug"),
        reader.GetString("title"),
        reader.GetString("release_year"),
        reader.GetString("genre"),
        reader.GetString("description"),
        reader.GetString("image"),
        reader.GetDateTime("start_datetime").ToString(),
        reader.GetDateTime("end_datetime").ToString(),
        reader.GetInt32("start_price"),
        reader.GetInt32("reserve_price"),
        reader.GetInt32("User")
      ));
    }
    return result;
  }

  public static async Task PostItem(State state, Item item)
  {
    // Generate the slug from the title
    string slug = item.Title.ToLower().Replace(" ", "-");

    // Check if the slug already exists in the database
    MySqlCommand checkCommand = new MySqlCommand("SELECT COUNT(*) FROM items WHERE slug = @slug", state.DB);
    checkCommand.Parameters.AddWithValue("@slug", slug);
    long existingCount = (long)await checkCommand.ExecuteScalarAsync();

    // If the slug already exists, append a number to it
    if (existingCount > 0)
    {
      int i = 1;
      while (true)
      {
        string newSlug = slug + "-" + i;
        checkCommand.Parameters.Clear();
        checkCommand.Parameters.AddWithValue("@slug", newSlug);
        existingCount = (long)await checkCommand.ExecuteScalarAsync();
        if (existingCount == 0)
        {
          slug = newSlug;
          break;
        }
        i++;
      }
    }

    
    using var cmd = new MySqlCommand("INSERT INTO items (slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price, user) VALUES (@slug, @title, @release_year, @genre, @description, @image, @start_datetime, @end_datetime, @start_price, @reserve_price, @user)", state.DB);
    cmd.Parameters.AddWithValue("@slug", slug);
    cmd.Parameters.AddWithValue("@title", item.Title);
    cmd.Parameters.AddWithValue("@release_year", item.ReleaseYear);
    cmd.Parameters.AddWithValue("@genre", item.Genre);
    cmd.Parameters.AddWithValue("@description", item.Description);
    cmd.Parameters.AddWithValue("@image", item.Img);
    cmd.Parameters.AddWithValue("@start_datetime", item.StartDateTime);
    cmd.Parameters.AddWithValue("@end_datetime", item.EndDateTime);
    cmd.Parameters.AddWithValue("@start_price", item.StartPrice);
    cmd.Parameters.AddWithValue("@reserve_price", item.ReservePrice);
    cmd.Parameters.AddWithValue("@user", item.User);
    await cmd.ExecuteNonQueryAsync();
  }

}
