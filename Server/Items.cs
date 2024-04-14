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

  public record SingleItemRecord(string Title, string ReleaseYear, string Genre, string Description,
    string Img, string EndDateTime, int StartPrice, int ReservePrice);

  public static IResult SingleItem(string slug, State state)
  {
    string query = "SELECT title, release_year, genre, description, image, end_datetime, start_price, reserve_price FROM items WHERE slug = @slug";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@slug", slug)]);

    if (reader.Read())
    {
      return TypedResults.Ok(new SingleItemRecord(
        reader.GetString("title"),
        reader.GetString("release_year"),
        reader.GetString("genre"),
        reader.GetString("description"),
        reader.GetString("image"),
        reader.GetDateTime("end_datetime").ToString(),
        reader.GetInt32("start_price"),
        reader.GetInt32("reserve_price")
      ));
    }
    else
    {
      return TypedResults.NotFound("Item not found");
    }
  }


  public record EndingSoonRecord(string Slug, string Title, string ReleaseYear, string Genre, string Description,
  string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice);

  public static IResult EndingSoon(State state)
  {
    List<EndingSoonRecord> ending = new();

    string query = "SELECT slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price FROM items WHERE end_datetime >= curdate() LIMIT 5";
    var reader = MySqlHelper.ExecuteReader(state.DB, query);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        ending.Add(new(
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
      return TypedResults.Ok(ending);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }
  }

  public static IResult Latest(State state)
  {
    List<EndingSoonRecord> ending = new();

    string query = "SELECT slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price FROM items ORDER BY start_datetime desc LIMIT 5";
    var reader = MySqlHelper.ExecuteReader(state.DB, query);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        ending.Add(new(
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
      return TypedResults.Ok(ending);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }
  }





  
  public record PostItemRecord(string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice, int User);
  public static IResult PostItem(PostItemRecord item, State state)
  {
    // Generate the slug from the title
    string slug = item.Title.ToLower().Replace(" ", "-");

    // Check if the slug already exists in the database
    string checkQuery = "SELECT COUNT(*) FROM items WHERE slug = @slug";
    MySqlParameter[] checkParameters = { new MySqlParameter("@slug", slug) };
    long existingCount = (long)MySqlHelper.ExecuteScalar(state.DB, checkQuery, checkParameters);

    // If the slug already exists, append a number to it
    if (existingCount > 0)
    {
      int i = 1;
      while (true)
      {
        string newSlug = slug + "-" + i;
        checkParameters[0].Value = newSlug;
        existingCount = (long)MySqlHelper.ExecuteScalar(state.DB, checkQuery, checkParameters);
        if (existingCount == 0)
        {
          slug = newSlug;
          break;
        }
        i++;
      }
    }

    string insertQuery = "INSERT INTO items (slug, title, release_year, genre, description, image, start_datetime, end_datetime, start_price, reserve_price, user) VALUES (@slug, @title, @release_year, @genre, @description, @image, @start_datetime, @end_datetime, @start_price, @reserve_price, @user)";
    MySqlParameter[] insertParameters = [
    new ("@slug", slug),
    new ("@title", item.Title),
    new ("@release_year", item.ReleaseYear),
    new ("@genre", item.Genre),
    new ("@description", item.Description),
    new ("@image", item.Img),
    new ("@start_datetime", item.StartDateTime),
    new ("@end_datetime", item.EndDateTime),
    new ("@start_price", item.StartPrice),
    new ("@reserve_price", item.ReservePrice),
    new ("@user", item.User)
  ];
    try
    {
      int affectedRows = MySqlHelper.ExecuteNonQuery(state.DB, insertQuery, insertParameters);
      if (affectedRows > 0)
      {
        // The operation was successful
        return TypedResults.Ok("Data has been successfully submitted");
      }
      else
      {
        // The operation did not affect any rows
        return TypedResults.Problem("No data was inserted");
      }
    }
    catch (Exception ex)
    {
      // An exception occurred during the operation
      return TypedResults.Problem("An error occurred while submitting the data: " + ex.Message);
    }


  }
}

