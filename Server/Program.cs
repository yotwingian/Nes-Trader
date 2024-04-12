using System.Security.Claims;

using Server;

State state = new("server=localhost;uid=root;pwd=mypassword;database=nes_trader;port=3306");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("nes-trader.user"); // Test
builder.Services.AddAuthorizationBuilder().AddPolicy("user", policy => policy.RequireClaim(ClaimTypes.NameIdentifier)); // Test

builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/", () => "NES Trader Server");

app.MapGet("/items", Items.All);
app.MapGet("/items/ending-soon", Items.EndingSoon);
app.MapGet("/items/latest", Items.Latest);
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
app.MapGet("/item/{slug}", Items.SingleItem);
app.MapPost("items/post", () => "Items.PostItem");

app.MapGet("/bids", Bids.All); // Används ej längre, kan tas bort
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
app.MapGet("/bids/item/{slug}", Bids.Item);
app.MapPost("/bids/post/{slug}", () => "Bids.PostBid").RequireAuthorization("user"); // Test

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
app.MapPost("/users/login", TestUsers.Login);
app.MapPost("/users/register", () => "Users.Register");

app.Run("http://localhost:3000");

public record State(string DB);
