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
app.MapGet("/item/{slug}", Items.Single);
app.MapGet("/items/{user}", () => "Items.User").RequireAuthorization("user");
app.MapPost("items/post", () => "Items.Post").RequireAuthorization("user");

app.MapGet("/bids", Bids.All); // Används ej längre, kan tas bort

app.MapGet("/bids/item/{slug}", Bids.Item);
app.MapGet("/bids/max/{slug}", Bids.Max);
app.MapGet("/bids/total/{slug}", Bids.Total);
app.MapGet("/bids/{user}", Items.UserBids).RequireAuthorization("user");
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
