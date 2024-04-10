namespace Server;
using MySql.Data.MySqlClient;

public class Bids
{
  public record Bid(int Id, int Amount, string Timespan, int Bidder, int ItemId);

  public static IResult All(State state)
  {
    List<Bid> allBids = new();
    string allBidsQuery = "SELECT id, amount, time, user, item FROM bids";
    var reader = MySqlHelper.ExecuteReader(state.DB, allBidsQuery);

    if (reader.HasRows)
    {
      while (reader.Read())
      {
        allBids.Add(new(
          reader.GetInt32("id"),
          reader.GetInt32("amount"),
          reader.GetDateTime("time").ToString(),
          reader.GetInt32("user"),
          reader.GetInt32("item")
        ));
      }
      return TypedResults.Ok(allBids);
    }
    else
    {
      return TypedResults.NotFound("Items not found");
    }
  }
}
