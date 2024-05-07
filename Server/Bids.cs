namespace Server;
using System.Data; // Behövs för att reader.IsDBNull("sträng") ska fungera
using MySql.Data.MySqlClient;

public class Bids
{
  public record Bid(int Amount, string Timespan, string Bidder);

  public static IResult Item(string slug, State state)
  {
    List<Bid> bids = new();
    string query = "SELECT bids.amount AS amount, bids.time AS time, users.username AS username FROM bids INNER JOIN users ON bids.user = users.id INNER JOIN items ON bids.item = items.id WHERE items.slug = @slug ORDER BY amount DESC";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@slug", slug)]);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        bids.Add(new(
          reader.GetInt32("amount"),
          reader.GetDateTime("time").ToString(),
          reader.GetString("username")
        ));
      }
      return TypedResults.Ok(bids);
    }
    else
    {
      return TypedResults.Ok(bids); // bids = [], Ok istället för NotFound eftersom en tom lista är att förvänta när det inte finns några bud
    }
  }

  public record MaxBid(int? Amount); // int? är nullable

  public static IResult Max(string slug, State state)
  {
    string query = "SELECT max(bids.amount) AS amount FROM bids INNER JOIN items ON bids.item = items.id WHERE items.slug = @slug";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@slug", slug)]);

    if (reader.Read())
    {
      int? amount = reader.IsDBNull("amount") ? null : reader.GetInt32("amount"); // om bids.amount är null, så = null, annars = värdet
      return TypedResults.Ok(new MaxBid(amount));
    }
    else
    {
      return TypedResults.NotFound("Max bid not found");
    }
  }

  public record TotalBids(int? Count);

  public static IResult Total(string slug, State state)
  {
    string query = "SELECT count(bids.amount) AS count FROM bids INNER JOIN items ON bids.item = items.id WHERE items.slug = @slug";
    using var reader = MySqlHelper.ExecuteReader(state.DB, query, [new("@slug", slug)]);

    if (reader.Read())
    {
      int? count = reader.IsDBNull("count") ? null : reader.GetInt32("count");
      return TypedResults.Ok(new TotalBids(count));
    }
    else
    {
      return TypedResults.NotFound("Total bids not found");
    }

  }

  public record ItemID(int ItemId);
  public record PostBid(string Amount, DateTime Timespan, string Bidder);
  public static IResult Post(string slug, State state, PostBid bid)
  {



    int ItemId = 0;

    Console.WriteLine("Slug " + slug);

    Console.WriteLine("ItemID" + ItemId);

    string queryItemId = "SELECT id AS itemid FROM items WHERE slug = @slug";

    Console.WriteLine("QueryItemID" + queryItemId);

    var reader = MySqlHelper.ExecuteReader(state.DB, queryItemId, [new("@slug", slug)]);

    if (reader.Read())
    {
      ItemId = reader.GetInt32("itemid");
    }




    int UserId = 0;

    string queryUserId = "SELECT users.id AS user FROM users WHERE username = @username";

    reader = MySqlHelper.ExecuteReader(state.DB, queryUserId, [new("@username", bid.Bidder)]);

    if (reader.Read())
    {
      UserId = reader.GetInt32("user");
    }
    Console.WriteLine(reader.Read());
    Console.WriteLine("Itemid: " + ItemId);

    string query = "INSERT INTO bids (amount, time, user, item) VALUES (@amount, @time, @user, @item)";

    var result = MySqlHelper.ExecuteNonQuery(state.DB, query, [
        new ("@amount", bid.Amount),
        new ("@time", bid.Timespan.ToLocalTime()),
        new ("@user", UserId),
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
