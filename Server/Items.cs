namespace Server;
using MySql.Data.MySqlClient;

public class Items
{
  public record Item(string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice);

  public static IResult All(State state)
  {
    List<Item> items = new();
    string query = "SELECT slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price FROM items";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query);

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
          reader.GetInt32("start_price")
        ));
      }
      return TypedResults.Ok(items);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }
  }

  public record SingleItem(string Title, string ReleaseYear, string Genre,
    string Description, string Img, string EndDateTime, int StartPrice);

  public static IResult Single(string slug, State state)
  {
    string query = "SELECT title, release_year, genre, description, image, end_datetime, start_price FROM items WHERE slug = @slug";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@slug", slug)]);

    if (reader.Read())
    {
      return TypedResults.Ok(new SingleItem(
        reader.GetString("title"),
        reader.GetString("release_year"),
        reader.GetString("genre"),
        reader.GetString("description"),
        reader.GetString("image"),
        reader.GetDateTime("end_datetime").ToString(),
        reader.GetInt32("start_price")
      ));
    }
    else
    {
      return TypedResults.NotFound("Item not found");
    }
  }

  public record FilteredItem(string Slug, string Title, string ReleaseYear,
    string Genre, string Img, string EndDateTime, int StartPrice);

  public static IResult EndingSoon(State state)
  {
    List<FilteredItem> ending = new();
    string query = "SELECT slug, title, release_year, genre, image, end_datetime, start_price FROM items WHERE end_datetime >= curdate() LIMIT 5";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        ending.Add(new(
          reader.GetString("slug"),
          reader.GetString("title"),
          reader.GetString("release_year"),
          reader.GetString("genre"),
          reader.GetString("image"),
          reader.GetDateTime("end_datetime").ToString(),
          reader.GetInt32("start_price")
        ));
      }
      return TypedResults.Ok(ending);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }
  }

  public static IResult Latest(State state)
  {
    List<FilteredItem> latest = new();
    string query = "SELECT slug, title, release_year, genre, image, end_datetime, start_price FROM items ORDER BY start_datetime DESC LIMIT 5";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        latest.Add(new(
          reader.GetString("slug"),
          reader.GetString("title"),
          reader.GetString("release_year"),
          reader.GetString("genre"),
          reader.GetString("image"),
          reader.GetDateTime("end_datetime").ToString(),
          reader.GetInt32("start_price")
        ));
      }
      return TypedResults.Ok(latest);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }
  }

  public record MyBids(string Title, string ReleaseYear, string Genre,
   string Description, string Img, string EndDateTime, int StartPrice);

  public static IResult Bids(int user, State state)
  {
    List<FilteredItem> bids = new();
    string query = "SELECT title, release_year, genre, description, image, end_datetime, start_price FROM items INNER JOIN users ON items.user = users.id";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@user", user)]);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        bids.Add(new(
         reader.GetString("title"),
         reader.GetString("release_year"),
         reader.GetString("genre"),
         reader.GetString("description"),
         reader.GetString("image"),
         reader.GetDateTime("end_datetime").ToString(),
         reader.GetInt32("start_price")
       ));
      }
      return TypedResults.Ok(bids);
    }
    else
    {
      return TypedResults.NotFound("Item not found");
    }
  }

}
