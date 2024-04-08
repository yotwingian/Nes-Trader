namespace Server;
using MySql.Data.MySqlClient;

public class Items
{
  public record Item(int ID, string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice);


  public static List<Item> All(State state)
  {
    List<Item> result = new();
    string query = "SELECT id, slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price FROM items";
    MySqlCommand command = new(query, state.DB);
    using var reader = command.ExecuteReader();

    while (reader.Read())
    {
      result.Add(new(
        reader.GetInt32("id"),
        reader.GetString("slug"),
        reader.GetString("title"),
        reader.GetString("release_year"),
        reader.GetString("genre"),
        reader.GetString("description"),
        reader.GetString("image"),
        reader.GetDateTime("start_datetime").ToString(),
        reader.GetDateTime("end_datetime").ToString(),
        reader.GetInt32("start_price"),
        reader.GetInt32("reserve_price")
      ));
    }
    return result;
  }

  public static Item? SingleItem(State state, string slug)
  {
    Item? result = null;
    string query = "SELECT id, slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price FROM items WHERE slug = @slug";
    MySqlCommand command = new(query, state.DB);
    command.Parameters.AddWithValue("@slug", slug);
    using var reader = command.ExecuteReader();

    while (reader.Read())
    {
      result = new Item(
        reader.GetInt32("id"),
        reader.GetString("slug"),
        reader.GetString("title"),
        reader.GetString("release_year"),
        reader.GetString("genre"),
        reader.GetString("description"),
        reader.GetString("image"),
        reader.GetDateTime("start_datetime").ToString(),
        reader.GetDateTime("end_datetime").ToString(),
        reader.GetInt32("start_price"),
        reader.GetInt32("reserve_price")
      );
    }
    return result;
  }

 
}
