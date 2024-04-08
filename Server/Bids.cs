namespace Server;

using MySql.Data.MySqlClient;

public class Bids
{
  public record Info(string Amount, string Timespan, string Bidder, int ItemId);
  public static void PostBid(State state, Info info)
  {
   
    string query = "INSERT INTO bids (amount, time, user, item) VALUES (@amount, @time, @user, @item)";
    MySqlCommand command = new(query, state.DB);
    
    command.Parameters.AddWithValue("@amount", info.Amount);
    command.Parameters.AddWithValue("@time", DateTime.Parse(info.Timespan));
    command.Parameters.AddWithValue("@user", 3);
    command.Parameters.AddWithValue("@item", info.ItemId);

    command.ExecuteNonQuery();
    

  }

}
