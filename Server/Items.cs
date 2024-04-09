namespace Server;
using MySql.Data.MySqlClient;

public class Items
{
  public record Item(string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice);

  public static IResult All(State state)
  {
    List<Item> items = new();
    string query = "SELECT slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price FROM items";
    var reader = MySqlHelper.ExecuteReader(state.DB, query);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        items.Add(new(
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
      return TypedResults.Ok(items);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }

  }
}
