namespace Server;
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
    string query = "SELECT bids.amount AS amount, bids.time AS time, users.username AS username FROM bids INNER JOIN users ON bids.user = users.id INNER JOIN items ON bids.item = items.id WHERE items.slug = @slug";
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
      return TypedResults.NotFound("Bids not found");
    }
  }

}
