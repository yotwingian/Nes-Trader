using Server;
using MySql.Data.MySqlClient;

MySqlConnection? db = null;
string connectionString = "server=localhost;uid=root;pwd=mypassword;database=nes_trader;port=3306";

try
{
  db = new(connectionString);
  db.Open();

  var builder = WebApplication.CreateBuilder(args);
  builder.Services.AddSingleton(new State(db));
  var app = builder.Build();

  app.MapGet("/", () => "NES Trader Server");

  app.MapGet("/items", Items.All);
  app.MapGet("/items/ending-soon", () => "Items.EndingSoon");
  app.MapGet("/items/latest", () => "Items.Latest");
  app.MapGet("/mylistings", () => @"
  [
      {
        ""id"": ""13"",
        ""title"": ""Pac-Man"",
        ""releaseYear"": 1984,
        ""genre"": ""Action"",
        ""description"": ""Original copy of the iconic Pac-Man game. The cartridge is in excellent condition and the game plays flawlessly. A classic piece for any retro game enthusiast!"",
        ""img"": ""/img/Pac-Man.jpeg"",
        ""startDateTime"": ""2024-05-17T10:00:00+01:00"",
        ""endDateTime"": ""2024-05-31T10:00:00+01:00"",
        ""startPrice"": ""60"",
        ""reservePrice"": ""90"",
        ""bids"": []
      },
      {
        ""id"": ""14"",
        ""title"": ""Galaxian"",
        ""releaseYear"": 1984,
        ""genre"": ""Action"",
        ""description"": ""This is an original Galaxian game cartridge in good condition. The game is fully functional and offers a nostalgic trip back to the golden age of arcade games. A fun addition to any game collection!"",
        ""img"": ""/img/Galaxian.jpeg"",
        ""startDateTime"": ""2024-05-24T10:00:00+01:00"",
        ""endDateTime"": ""2024-06-07T10:00:00+01:00"",
        ""startPrice"": ""40"",
        ""reservePrice"": ""60"",
        ""bids"": []
      },
      {
        ""id"": ""15"",
        ""title"": ""Nuts & Milk"",
        ""releaseYear"": 1984,
        ""genre"": ""Action"",
        ""description"": ""Rare game Nuts & Milk for the NES. The cartridge is in great condition. Perfect for collectors looking for unique pieces."",
        ""img"": ""/img/Nuts&Milk.jpeg"",
        ""startDateTime"": ""2024-06-01T10:00:00+01:00"",
        ""endDateTime"": ""2024-06-15T10:00:00+01:00"",
        ""startPrice"": ""75"",
        ""reservePrice"": ""112"",
        ""bids"": []
      }
  ]
  ");
  // ^ Mockdata, ska tas bort! Ersätts med endpoint "/items/{user}" v
  app.MapGet("/items/{user}", () => "Items.User");
  app.MapPost("items/post", () => "Items.PostItem");

  app.MapGet("/items/item/{slug}", () => "Items.SingleItem");
  app.MapGet("/items/item/{slug}/bids", () => "Items.ItemBids");
  app.MapPost("/items/item/{slug}/post-bid", () => "Items.PostBid"); // Kopplad till slug, men hör det till Items eller Bids - "/bids/{slug}/post"?

  app.MapGet("/bids", () => @"
  [
      {
        ""id"": ""4997"",
        ""bidder"": ""test"",
        ""amount"": ""100"",
        ""timespan"": ""2024-03-06 15:50:08"",
        ""itemId"": 5
      },
      {
        ""id"": ""167e"",
        ""bidder"": ""Steef"",
        ""amount"": ""2000"",
        ""timespan"": ""2024-03-06T14:56:05.000Z"",
        ""itemId"": 5
      },
      {
        ""id"": ""9cd9"",
        ""bidder"": ""Steef"",
        ""amount"": ""300"",
        ""timespan"": ""2024-03-06T21:09:09.000Z"",
        ""itemId"": ""1""
      },
      {
        ""id"": ""9a7e"",
        ""bidder"": ""hej"",
        ""amount"": ""500"",
        ""timespan"": ""2024-03-06T21:09:38.000Z"",
        ""itemId"": ""5""
      },
      {
        ""id"": ""2b68"",
        ""bidder"": ""steef"",
        ""amount"": ""4000"",
        ""timespan"": ""2024-03-06T21:11:44.000Z"",
        ""itemId"": 5
      },
      {
        ""id"": ""e948"",
        ""bidder"": ""Test"",
        ""amount"": ""20000"",
        ""timespan"": ""2024-03-07T10:54:11.000Z"",
        ""itemId"": 2
      },
      {
        ""id"": ""9411"",
        ""bidder"": ""test222"",
        ""amount"": ""222"",
        ""timespan"": ""2024-03-07T10:55:57.000Z"",
        ""itemId"": 1
      },
      {
        ""id"": ""6b2d"",
        ""bidder"": ""test"",
        ""amount"": ""500"",
        ""timespan"": ""2024-03-07T12:45:06.000Z"",
        ""itemId"": 1
      },
      {
        ""id"": ""905f"",
        ""bidder"": ""mustafa"",
        ""amount"": ""400000"",
        ""timespan"": ""2024-03-07T12:45:47.000Z"",
        ""itemId"": ""1""
      },
      {
        ""id"": ""d7fa"",
        ""bidder"": ""Mustafa"",
        ""amount"": ""50000000"",
        ""timespan"": ""2024-03-07T12:46:30.000Z"",
        ""itemId"": ""1""
      },
      {
        ""id"": ""ae5f"",
        ""bidder"": ""Hej"",
        ""amount"": ""4"",
        ""timespan"": ""2024-03-07T12:47:03.000Z"",
        ""itemId"": 1
      },
      {
        ""id"": ""f25e"",
        ""bidder"": ""123"",
        ""amount"": ""123"",
        ""timespan"": ""2024-03-10T13:00:19.000Z"",
        ""itemId"": 1
      },
      {
        ""id"": ""b37b"",
        ""bidder"": ""mario"",
        ""amount"": ""100"",
        ""timespan"": ""2024-03-13T10:13:33.283Z"",
        ""itemId"": 4
      },
      {
        ""id"": ""6db8"",
        ""bidder"": ""mario"",
        ""amount"": ""4001"",
        ""timespan"": ""2024-03-13T10:15:08.330Z"",
        ""itemId"": 5
      },
      {
        ""id"": ""3dac"",
        ""bidder"": ""mario"",
        ""amount"": ""500000000"",
        ""timespan"": ""2024-03-13T20:28:14.352Z"",
        ""itemId"": 1
      },
      {
        ""id"": ""7262"",
        ""bidder"": ""mario"",
        ""amount"": ""45"",
        ""timespan"": ""2024-03-14T08:30:40.559Z"",
        ""itemId"": 9
      },
      {
        ""id"": ""af5b"",
        ""bidder"": ""mario"",
        ""amount"": ""55"",
        ""timespan"": ""2024-03-14T08:30:47.692Z"",
        ""itemId"": 8
      },
      {
        ""id"": ""b114"",
        ""bidder"": ""mario"",
        ""amount"": ""50"",
        ""timespan"": ""2024-03-14T08:30:56.022Z"",
        ""itemId"": 10
      },
      {
        ""id"": ""23a2"",
        ""bidder"": ""mario"",
        ""amount"": ""20001"",
        ""timespan"": ""2024-03-14T09:09:06.198Z"",
        ""itemId"": 2
      },
      {
        ""id"": ""0756"",
        ""bidder"": ""mario"",
        ""amount"": ""20005"",
        ""timespan"": ""2024-03-14T09:09:12.190Z"",
        ""itemId"": 2
      }
    ]
  ");
  // ^ Mockdata, ska tas bort! Ersätts med metod Bids.All
  app.MapGet("/mybids", () => @"
  [
      {
        ""id"": ""8"",
        ""title"": ""Gomoku Narabe Renju"",
        ""releaseYear"": 1983,
        ""genre"": ""Strategy / tactics"",
        ""description"": ""Gomoku Narabe Renju is a strategy game for the NES. This original copy is in good condition and is a unique find for any retro game collector."",
        ""img"": ""/img/Gomoku_Narabe_Renju.jpg"",
        ""startDateTime"": ""2024-04-12T10:00:00+01:00"",
        ""endDateTime"": ""2024-04-26T10:00:00+01:00"",
        ""startPrice"": ""55"",
        ""reservePrice"": ""83"",
        ""bids"": []
      },
      {
        ""id"": ""9"",
        ""title"": ""Mahjong"",
        ""releaseYear"": 1983,
        ""genre"": ""Strategy"",
        ""description"": ""This is an original Mahjong game for the NES. The cartridge is in excellent condition. A great addition to any game collection!"",
        ""img"": ""/img/Mahjong.jpeg"",
        ""startDateTime"": ""2024-04-19T10:00:00+01:00"",
        ""endDateTime"": ""2024-05-03T10:00:00+01:00"",
        ""startPrice"": ""45"",
        ""reservePrice"": ""68"",
        ""bids"": []
      },
      {
        ""id"": ""10"",
        ""title"": ""Popeye no Eigo Asobi"",
        ""releaseYear"": 1983,
        ""genre"": ""Action, Educational, Puzzle"",
        ""description"": ""Popeye no Eigo Asobi is a unique educational game featuring the beloved character Popeye. The cartridge is in good condition and the game plays well. A fun and educational addition to any game collection!"",
        ""img"": ""/img/Popeye_no_Eigo_Asobi.jpeg"",
        ""startDateTime"": ""2024-04-26T10:00:00+01:00"",
        ""endDateTime"": ""2024-05-10T10:00:00+01:00"",
        ""startPrice"": ""50"",
        ""reservePrice"": ""75"",
        ""bids"": []
      }
  ]
  ");
  // ^ Mockdata, ska tas bort! Ersätts med endpoint "/bids/{user}" v
  app.MapGet("/bids/{user}", () => "Bids.User");

  app.MapGet("/users", () => @"
  [
      {
        ""userId"": 1,
        ""userName"": ""mario"",
        ""email"": ""mario@example.com"",
        ""password"": ""mario123"",
        ""id"": ""2357""
      }
  ]
  ");
  // ^ Mockdata, ska tas bort!
  app.MapPost("/users/login", () => "Users.Login");
  app.MapPost("/users/register", () => "Users.Register");

  app.Run("http://localhost:3000");
}
catch (MySqlException e)
{
  Console.WriteLine(e);
}
finally
{
  db?.Close();
}

public record State(MySqlConnection DB);
