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
app.MapPost("/items/post/{user}", Items.Post).RequireAuthorization("user");

app.MapGet("/bids/item/{slug}", Bids.Item);
app.MapGet("/bids/max/{slug}", Bids.Max);
app.MapGet("/bids/total/{slug}", Bids.Total);
app.MapGet("/bids/{user}", Items.UserBids).RequireAuthorization("user");
app.MapPost("/bids/post/{slug}", Bids.Post).RequireAuthorization("user");

app.MapPost("/users/login", Users.Login);
app.MapPost("/users/register", Users.Register);
app.MapDelete("/users/delete/{user}", Users.Delete);

app.Run("http://localhost:3000");

public record State(string DB);
