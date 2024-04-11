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
    MySqlParameter[] insertParameters = {
    new MySqlParameter("@slug", slug),
    new MySqlParameter("@title", item.Title),
    new MySqlParameter("@release_year", item.ReleaseYear),
    new MySqlParameter("@genre", item.Genre),
    new MySqlParameter("@description", item.Description),
    new MySqlParameter("@image", item.Img),
    new MySqlParameter("@start_datetime", item.StartDateTime),
    new MySqlParameter("@end_datetime", item.EndDateTime),
    new MySqlParameter("@start_price", item.StartPrice),
    new MySqlParameter("@reserve_price", item.ReservePrice),
    new MySqlParameter("@user", item.User)
  };
    try
    {
      
      MySqlHelper.ExecuteNonQuery(state.DB, insertQuery, insertParameters);
      
      return TypedResults.Ok("Data has been successfully submitted");
    }
    catch (Exception ex)
    {
     
      return TypedResults.Problem("An error occurred while submitting the data");
    }

  }

}


