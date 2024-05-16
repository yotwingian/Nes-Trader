using System.Security.Claims;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Server;

State state = new("server=localhost;uid=root;pwd=mypassword;database=nes_trader;port=3306");

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
  serverOptions.ListenAnyIP(3000);
});

builder.Services.AddAuthentication().AddCookie("nes-trader.user");
builder.Services.AddAuthorizationBuilder().AddPolicy("user", policy => policy.RequireClaim(ClaimTypes.NameIdentifier));
builder.Services.AddSingleton(state);
var app = builder.Build();

var distPath = Path.Combine(app.Environment.ContentRootPath, "../Client/dist");
var fileProvider = new PhysicalFileProvider(distPath);

app.UseHttpsRedirection();

app.UseDefaultFiles(new DefaultFilesOptions
{
  FileProvider = fileProvider,
  DefaultFileNames = new List<string> { "index.html" }
});

app.UseStaticFiles(new StaticFileOptions
{
  FileProvider = fileProvider,
  RequestPath = ""
});

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

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

app.MapFallback(async context =>
{
  string path = context.Request.Path.Value;
  if (!path.StartsWith("/api"))
  {
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync(Path.Combine(distPath, "index.html"));
  }
});

app.Run();

public record State(string DB);
