namespace Server;
using System.Data; // Behövs för att reader.IsDBNull("sträng") ska fungera
using MySql.Data.MySqlClient;

public class Bids
{
  public record OldBid(int Id, int Amount, string Timespan, int Bidder, int ItemId); // Används ej längre, kan tas bort

  public static IResult All(State state) // Används ej längre, kan tas bort
  {
    List<OldBid> bids = new();
    using var reader = MySqlHelper.ExecuteReader(state.DB,
   "SELECT id, amount, time, user, item FROM bids");

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        bids.Add(new(
          reader.GetInt32("id"),
          reader.GetInt32("amount"),
          reader.GetDateTime("time").ToString(),
          reader.GetInt32("user"),
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

}
