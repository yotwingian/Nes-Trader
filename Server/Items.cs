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
    string query = "SELECT slug, title, release_year, genre, image, end_datetime, start_price FROM items WHERE DATE_SUB(end_datetime, INTERVAL 2 HOUR) > NOW() ORDER BY end_datetime LIMIT 5";
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

  public static IResult UserItems(string user, State state)
  {
    List<FilteredItem> userItems = new();
    string query = "SELECT slug, title, release_year, genre, image, end_datetime, start_price FROM items INNER JOIN users ON items.user = users.id WHERE users.username = @username ORDER BY start_datetime DESC";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@username", user)]);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        userItems.Add(new(
          reader.GetString("slug"),
          reader.GetString("title"),
          reader.GetString("release_year"),
          reader.GetString("genre"),
          reader.GetString("image"),
          reader.GetDateTime("end_datetime").ToString(),
          reader.GetInt32("start_price")
        ));
      }
      return TypedResults.Ok(userItems);
    }
    else
    {
      return TypedResults.Ok(userItems);
    }
  }

  public record PostItem(string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice, int User);
  public static IResult Post(string user, PostItem item, State state)
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

    int UserId = 0;

    string queryUserId = "SELECT users.id AS user FROM users WHERE username = @username";

    using var reader = MySqlHelper.ExecuteReader(state.DB, queryUserId, [new("@username", user)]);

    if (reader.Read())
    {
      UserId = reader.GetInt32("user");
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
    new ("@user", UserId)
  ];
    try
    {
      int affectedRows = MySqlHelper.ExecuteNonQuery(state.DB, insertQuery, insertParameters);
      if (affectedRows > 0)
      {
         
        return TypedResults.Ok("Game has been successfully submitted");
      }
      else
      {
        
        return TypedResults.Problem("No data was inserted");
      }
    }
    catch (Exception ex)
    {
      
      return TypedResults.Problem("An error occurred while submitting the data: " + ex.Message);
    }


  }

  public static IResult Delete(string user, State state)
  {
    string query = "DELETE FROM items WHERE user = (SELECT id FROM users WHERE username = @username)";
    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [new("@username", user)]);

    if (result > 0)
    {
      return TypedResults.Ok("User items have been successfully deleted");
    }
    else
    {
      return TypedResults.NotFound("No items were found and deleted");
    }
  }

  public static IResult UserBids(string user, State state)
  {
    List<FilteredItem> bids = new();
    string query = "SELECT slug, title, release_year, genre, image, end_datetime, start_price FROM items INNER JOIN bids ON items.id = bids.item INNER JOIN users ON bids.user = users.id WHERE username = @username AND DATE_SUB(end_datetime, INTERVAL 2 HOUR) > NOW() GROUP BY items.slug";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@username", user)]);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        bids.Add(new(
          reader.GetString("slug"),
         reader.GetString("title"),
         reader.GetString("release_year"),
         reader.GetString("genre"),
         reader.GetString("image"),
         reader.GetDateTime("end_datetime").ToString(),
         reader.GetInt32("start_price")
       ));
      }
      return TypedResults.Ok(bids);
    }
    else
    {
      return TypedResults.Ok(bids);
    }
  }
}
