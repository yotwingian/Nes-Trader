namespace Server;

using Microsoft.VisualBasic;
using MySql.Data.MySqlClient;

public class Bids
{
  public record Bid(int Amount, string Timespan, string Bidder, int Item);

  public static IResult Item(string slug, State state)
  {
    List<Bid> bids = new();
    string query = "SELECT bids.amount AS amount, bids.time AS time, users.username AS username, bids.item as item FROM bids INNER JOIN users ON bids.user = users.id INNER JOIN items ON bids.item = items.id WHERE items.slug = @slug";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@slug", slug)]);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        bids.Add(new(
          reader.GetInt32("amount"),
          reader.GetDateTime("time").ToString(),
          reader.GetString("username"),
          reader.GetInt32("item")
        ));
      }
      return TypedResults.Ok(bids);
    }
    else
    {
      return TypedResults.NotFound("Bids not found");
    }
  }

  public record ItemIdRecord(int ItemId);
  public record PostBidRecord(string Amount, DateTime Timespan, string Bidder);
  public static IResult PostBid(string slug, State state, PostBidRecord bid)
  {
    
    int ItemId = 0;

    string queryItemId = "SELECT bids.item AS itemid FROM bids INNER JOIN items ON bids.item = items.id WHERE slug = @slug";

    var reader = MySqlHelper.ExecuteReader(state.DB, queryItemId, [new("@slug", slug)]);

    if(reader.Read())
    {
      ItemId = reader.GetInt32("itemid");
    }

    Console.WriteLine(ItemId);

    string query = "INSERT INTO bids (amount, time, user, item) VALUES (@amount, @time, @user, @item)";
    
    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [
        new ("@amount", bid.Amount),
        new ("@time", bid.Timespan.ToLocalTime()),
        new ("@user", 3),
        new ("@item", ItemId)
        ]);

    if (result > 0)
    {
      // return to client/frontend
      return TypedResults.Created("Post succesfull");
    }
    else
    {
      // return to client/frontend
      return TypedResults.Problem("Something went wrong");
    }

  }

}
