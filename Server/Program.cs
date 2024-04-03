// using Server; - Kommer behövas när vi skapar namespace Server; i andra filer.

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Home"); // Hämtar ingen data, borde inte behövas?
app.MapGet("/items", () => @"
 [
    {
      ""id"": ""1"",
      ""title"": ""Mario Bros."",
      ""releaseYear"": 1983,
      ""genre"": ""Action"",
      ""description"": ""This is an original copy of the classic Mario Bros. game. The cartridge is in good condition with minor wear and tear from use. The game plays perfectly and brings back the nostalgia of the 80s arcade era. A must-have for any retro game collector!"",
      ""img"": ""https://i.ebayimg.com/images/g/dt0AAOSwMYZhyMnW/s-l1600.jpg"",
      ""startDateTime"": ""2024-02-24T10:00:00+01:00"",
      ""endDateTime"": ""2024-03-10T10:07:00+01:00"",
      ""startPrice"": ""70"",
      ""reservePrice"": ""105"",
      ""bids"": [
        {
          ""bidder"": ""test"",
          ""amount"": 80,
          ""timestamp"": ""2024-03-07T12:15:00+01:00""
        },
        {
          ""bidder"": ""test2"",
          ""amount"": 90,
          ""timestamp"": ""2024-03-07T12:17:00+01:00""
        }
      ]
    },
    {
      ""id"": ""2"",
      ""title"": ""Donkey Kong Junior"",
      ""releaseYear"": 1983,
      ""genre"": ""Action"",
      ""description"": ""This is an original copy of the classic Donkey Kong Junior game. The cartridge is in good condition with minor wear and tear from use. The game plays perfectly and brings back the nostalgia of the 80s arcade era. A must-have for any retro game collector!"",
      ""img"": ""/img/Donkey_Kong_Junior.jpeg"",
      ""startDateTime"": ""2024-03-01T10:00:00+01:00"",
      ""endDateTime"": ""2024-03-24T12:40:00+01:00"",
      ""startPrice"": ""50"",
      ""reservePrice"": ""75"",
      ""bids"": []
    },
    {
      ""id"": ""3"",
      ""title"": ""Donkey Kong"",
      ""releaseYear"": 1983,
      ""genre"": ""Action"",
      ""description"": ""Original copy of the iconic Donkey Kong game. The cartridge is in excellent condition and the game plays flawlessly. A classic piece for any retro game enthusiast!"",
      ""img"": ""/img/Donkey_Kong.jpeg"",
      ""startDateTime"": ""2024-03-08T10:00:00+01:00"",
      ""endDateTime"": ""2024-03-22T10:00:00+01:00"",
      ""startPrice"": ""60"",
      ""reservePrice"": ""90"",
      ""bids"": []
    },
    {
      ""id"": ""4"",
      ""title"": ""Popeye"",
      ""releaseYear"": 1983,
      ""genre"": ""Action"",
      ""description"": ""This is an original Popeye game cartridge in good condition. The game is fully functional and offers a nostalgic trip back to the golden age of arcade games. A fun addition to any game collection!"",
      ""img"": ""/img/Popeye.jpeg"",
      ""startDateTime"": ""2024-03-15T10:00:00+01:00"",
      ""endDateTime"": ""2024-03-29T10:00:00+01:00"",
      ""startPrice"": ""40"",
      ""reservePrice"": ""60"",
      ""bids"": []
    },
    {
      ""id"": ""5"",
      ""title"": ""Donkey Kong Jr. Math"",
      ""releaseYear"": 1983,
      ""genre"": ""Educational, Puzzle"",
      ""description"": ""Rare educational game Donkey Kong Jr. Math. The cartridge is in great condition. Perfect for collectors looking for unique pieces."",
      ""img"": ""/img/Donkey_Kong_Jr_Math.jpeg"",
      ""startDateTime"": ""2024-03-22T10:00:00+01:00"",
      ""endDateTime"": ""2024-04-05T10:00:00+01:00"",
      ""startPrice"": ""75"",
      ""reservePrice"": ""113"",
      ""bids"": []
    },
    {
      ""id"": ""6"",
      ""title"": ""Baseball"",
      ""releaseYear"": 1983,
      ""genre"": ""Sports"",
      ""description"": ""Original Baseball game for the NES. The cartridge shows some signs of use but is in good working condition. A fun addition to any game collection!"",
      ""img"": ""/img/Baseball.jpeg"",
      ""startDateTime"": ""2024-03-29T10:00:00+01:00"",
      ""endDateTime"": ""2024-04-12T10:00:00+01:00"",
      ""startPrice"": ""30"",
      ""reservePrice"": ""45"",
      ""bids"": []
    },
    {
      ""id"": ""7"",
      ""title"": ""Donkey Kong Jr. / Jr. Sansuu Lesson"",
      ""releaseYear"": 1983,
      ""genre"": ""Compilation"",
      ""description"": ""This is a compilation of Donkey Kong Jr. games, including the rare Jr. Sansuu Lesson. The cartridge is in good condition and the games work perfectly. A unique find for any retro game collector!"",
      ""img"": ""/img/Jr_Sansu_Lesson.jpg"",
      ""startDateTime"": ""2024-04-05T10:00:00+01:00"",
      ""endDateTime"": ""2024-04-19T10:00:00+01:00"",
      ""startPrice"": ""80"",
      ""reservePrice"": ""120"",
      ""bids"": []
    },
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
    },
    {
      ""id"": ""11"",
      ""title"": ""Excitebike"",
      ""releaseYear"": 1984,
      ""genre"": ""Sports, Racing / Driving"",
      ""description"": ""Original Excitebike game for the NES. The cartridge is in good condition with minor wear. A classic racing game that's fun for all ages!"",
      ""img"": ""/img/Excitebike.jpeg"",
      ""startDateTime"": ""2024-05-03T10:00:00+01:00"",
      ""endDateTime"": ""2024-05-17T10:00:00+01:00"",
      ""startPrice"": ""35"",
      ""reservePrice"": ""53"",
      ""bids"": []
    },
    {
      ""id"": ""12"",
      ""title"": ""Mappy"",
      ""releaseYear"": 1984,
      ""genre"": ""Action"",
      ""description"": ""This is an original Mappy game cartridge in good condition. The game is fully functional and offers a nostalgic trip back to the golden age of arcade games. A fun addition to any game collection!"",
      ""img"": ""/img/Mappy.jpeg"",
      ""startDateTime"": ""2024-05-10T10:00:00+01:00"",
      ""endDateTime"": ""2024-05-24T10:00:00+01:00"",
      ""startPrice"": ""40"",
      ""reservePrice"": ""60"",
      ""bids"": []
    },
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
    },
    {
      ""id"": ""2e16"",
      ""title"": ""Teenage Mutant Ninja Turtles"",
      ""releaseYear"": ""1989"",
      ""genre"": ""Action"",
      ""description"": ""A game"",
      ""img"": ""https://www.arkad.nu/9917/uploads/fbf34639-01f8-4e96-a45a-490d05d78f2a.jpg"",
      ""startDateTime"": ""2024-03-14T09:14"",
      ""endDateTime"": ""2024-03-21T09:14"",
      ""startPrice"": ""10"",
      ""reservePrice"": ""70""
    }
  ]
"); // Mockdata, ska ersättas med db
app.MapGet("/items/ending-soon", () => "EndingItems");
app.MapGet("/items/latest", () => "LatestItems");
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
"); // Mockdata, ska tas bort! Ersätts med "/items/{user}"
app.MapGet("/items/{user}", () => "MyItems");
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
"); // Mockdata, ska tas bort?
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
"); // Mockdata, ska tas bort! Ersätts med "/bids/{user}"
app.MapGet("/bids/{user}", () => "MyBids");
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
"); // Mockdata, ska tas bort?
app.MapPost("/login", () => "Login");
app.MapPost("/register", () => "Register");
app.MapGet("/item-details/{slug}", () => "ItemDetails"); // Döpa om till "/item"?
app.MapGet("/item-details/{slug}/bids", () => "ItemBids");
app.MapPost("/item-details/{slug}/new-bid", () => "NewBid");
app.MapPost("/new-item", () => "NewItem");

app.Run("http://localhost:3000");
