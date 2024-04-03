// using Server; - Kommer behövas när vi skapar namespace Server; i andra filer.

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Home"); // Hämtar ingen data, borde inte behövas?
app.MapGet("/items", () => "Items");
app.MapGet("/items/ending-soon", () => "EndingItems");
app.MapGet("/items/latest", () => "LatestItems");
app.MapGet("/items/{user}", () => "MyItems");
app.MapGet("/bids/{user}", () => "MyBids");
app.MapPost("/login", () => "Login");
app.MapPost("/register", () => "Register");
app.MapGet("/item-details/{slug}", () => "ItemDetails"); // Döpa om till "/item"?
app.MapGet("/item-details/{slug}/bids", () => "ItemBids");
app.MapPost("/item-details/{slug}/new-bid", () => "NewBid");
app.MapPost("/new-item", () => "NewItem");

app.Run("http://localhost:3000");
