using System.Security.Claims;
using Server;

State state = new("server=localhost;uid=root;pwd=docker;database=nes_trader;port=3306");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("nes-trader.user");
builder.Services.AddAuthorizationBuilder().AddPolicy("user", policy => policy.RequireClaim(ClaimTypes.NameIdentifier));
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/", () => "NES Trader Server");

app.MapGet("/api/items", Items.All);
app.MapGet("/api/items/ending-soon", Items.EndingSoon);
app.MapGet("/api/items/latest", Items.Latest);
app.MapGet("/api/item/{slug}", Items.Single);
app.MapGet("/api/items/{user}", Items.UserItems).RequireAuthorization("user");
app.MapPost("/api/items/post/{user}", Items.Post).RequireAuthorization("user");
app.MapDelete("/api/items/delete/{user}", Items.Delete);

app.MapGet("/api/bids/item/{slug}", Bids.Item);
app.MapGet("/api/bids/max/{slug}", Bids.Max);
app.MapGet("/api/bids/total/{slug}", Bids.Total);
app.MapGet("/api/bids/{user}", Items.UserBids).RequireAuthorization("user");
app.MapPost("/api/bids/post/{slug}", Bids.Post).RequireAuthorization("user");
app.MapDelete("/api/bids/delete/{user}", Bids.Delete);

app.MapPost("/api/users/login", Users.Login);
app.MapPost("/api/users/register", Users.Register);
app.MapDelete("/api/users/delete/{user}", Users.Delete);

app.Run("http://localhost:3000");

public record State(string DB);
