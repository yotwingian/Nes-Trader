namespace Server;
using MySql.Data.MySqlClient;

public class Bids
{
  public record Bid(int Id, int Amount, string Timespan, int Bidder, int ItemId);

  public static List<Bid> All(State state)
  {
    List<Bid> result = new();
    string query = "SELECT id, amount, time, user, item FROM bids";
    MySqlCommand command = new(query, state.DB);
    using var reader = command.ExecuteReader();

    while (reader.Read())
    {
      result.Add(new(
        reader.GetInt32("id"),
        reader.GetInt32("amount"),
        reader.GetDateTime("time").ToString(),
        reader.GetInt32("user"),
        reader.GetInt32("item")
      ));
    }
    return result;
  }
}
