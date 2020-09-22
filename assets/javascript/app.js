var gifSearches = ["baseball", "basketball", "football"];

function displayButtons () {
    $(".gifButtons").empty();
    for (let i=0; i<gifSearches.length; i++) {
        var newSearch = $("<button>");
        newSearch.addClass("topic btn btn-dark");
        newSearch.attr("data-name", gifSearches[i]);
        newSearch.text(gifSearches[i]);
        $(".gifButtons").append(newSearch);
    }
}

function addSearch () {
    event.preventDefault();
    var search = $("#insertTopic").val().toLowerCase().trim();
    console.log("search")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

        if (response.data.length == 0) {
            alert("No Gifs found for topic");
        }
        else if (gifSearches.indexOf(search) != -1) {
            alert("Topic already exists");
        }
        else {
            gifSearches.push(search);
            displayButtons();
        }

    });    
};

function displayGifs () {
    var search = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      console.log(response);
      $(".gifsDisplay").empty();
      for (var i = 0; i < response.data.length; i++) {
          var gifDiv = $("<div>");
          gifDiv.addClass("gifDiv");
          gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");
          var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          gifImage.addClass("gif");
          var imageDiv = $("<div>");
          imageDiv.addClass("play");
          gifImage.attr("data-state", "still");
          gifImage.attr("data-name", search);
          gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
          gifImage.attr("data-animate",response.data[i].images.fixed_height.url)
          $(imageDiv).append(gifImage);
          $(gifDiv).append(imageDiv);
          $(".gifsDisplay").append(gifDiv);
      }

    });
};
function playGif () {
  var state = $(this).attr("data-state");
  console.log("clicked")
  console.log(state)
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

$(document).on("click", ".topic", displayGifs);
$(document).on("click", ".gif", playGif);
$(document).on("click", "#newtopic", addSearch);

displayButtons();