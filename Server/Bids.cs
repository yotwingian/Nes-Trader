namespace Server;
using MySql.Data.MySqlClient;

public class Bids
{
  public record Bid(int Id, int Amount, string Timespan, int Bidder, int ItemId);

  public static IResult All(State state)
  {
    List<Bid> bids = new();
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
      return TypedResults.NotFound("Items not found");
    }
  }
}
