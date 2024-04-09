namespace Server;

using MySql.Data.MySqlClient;

public class Bids
{


  public record ItemBids(int ID, string Slug, string Title, string ReleaseYear, string Genre, string Description,
    string Img, string StartDateTime, string EndDateTime, int StartPrice, int ReservePrice, int bids_id, int bids_amount, string bids_time, int bids_user, int bids_item, string username);

  public record Bid(string Amount, string Timespan, string Bidder, int ItemId);
  public static void PostBid(State state, Bid bid)
  {
    string query = "INSERT INTO bids (amount, time, user, item) VALUES (@amount, @time, @user, @item)";
    MySqlCommand command = new(query, state.DB);
    
    command.Parameters.AddWithValue("@amount", bid.Amount);
    command.Parameters.AddWithValue("@time", DateTime.Parse(bid.Timespan));
    command.Parameters.AddWithValue("@user", 3); // bör vara bid.Bidder så fort det inte är undefined.
    command.Parameters.AddWithValue("@item", bid.ItemId);

    command.ExecuteNonQuery();
  }

  public static List<ItemBids> ItemsBids(State state, string slug)
  {
    List<ItemBids> result = new();
    string query = "SELECT items.id, items.slug, items.title, items.release_year, items.genre, items.description, items.image, items.start_datetime, items.end_datetime, items.start_price, items.reserve_price, bids.id AS bids_id, bids.amount AS bids_amount, bids.time AS bids_time, bids.user AS bids_user, bids.item AS bids_item, users.username AS username FROM bids INNER JOIN users ON users.id = bids.user INNER JOIN items ON bids.item = items.id WHERE items.slug = @slug";
    MySqlCommand command = new(query, state.DB);
    command.Parameters.AddWithValue("@slug", slug);
    using var reader = command.ExecuteReader();

    while (reader.Read())
    {
      result.Add(new ItemBids(
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
          reader.GetInt32("reserve_price"),
          reader.GetInt32("bids_id"),
          reader.GetInt32("bids_amount"),
          reader.GetDateTime("bids_time").ToString(),
          reader.GetInt32("bids_user"),
          reader.GetInt32("bids_item"),
          reader.GetString("username")
      ));
    }
    return result;
  }

}
