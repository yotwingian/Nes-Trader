using System.Security.Claims;
using Server;

State state = new("server=localhost;uid=root;pwd=mypassword;database=nes_trader;port=3306");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("nes-trader.user");
builder.Services.AddAuthorizationBuilder().AddPolicy("user", policy => policy.RequireClaim(ClaimTypes.NameIdentifier));
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/", () => "NES Trader Server");

app.MapGet("/items", Items.All);
app.MapGet("/items/ending-soon", Items.EndingSoon);
app.MapGet("/items/latest", Items.Latest);
app.MapGet("/item/{slug}", Items.Single);
app.MapGet("/items/{user}", Items.UserItems).RequireAuthorization("user");
app.MapPost("items/post", () => "Items.Post").RequireAuthorization("user");

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
app.MapGet("/bids/item/{slug}", Bids.Item);
app.MapGet("/bids/max/{slug}", Bids.Max);
app.MapGet("/bids/total/{slug}", Bids.Total);
app.MapGet("/bids/{user}", () => "Bids.User").RequireAuthorization("user");
app.MapPost("/bids/post/{slug}", () => "Bids.Post").RequireAuthorization("user");

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
app.MapPost("/users/login", Users.Login);
app.MapPost("/users/register", () => "Users.Register");

app.Run("http://localhost:3000");

public record State(string DB);
