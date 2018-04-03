/*


Things this should be able to do:
    1. Display some initial working options, similar to [movies] from the examples
    2. Add additional buttons
    3. Those buttons when clicked create a set of divs, like [movies] which will then replace the ones on the screen currently
    4. Those gifs should be able to be paused


*/

var fruit = ["apple", "banana", "strawberry"];

$(document).ready(

    renderButtons
)

$("#add-fruit").on("click", function () {

    event.preventDefault();

    var fruits = $("#fruit-input").val().trim().toLowerCase();

    fruit.push(fruits)

    renderButtons();
})

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < fruit.length; i++) {

        var a = $("<button>");

        a.addClass("fruit-btn btn btn-secondary");

        a.attr("data-fruit", fruit[i]);

        a.text(fruit[i]);

        $("#buttons-view").append(a);
    }
}


$("#buttons-view").on("click", ".fruit-btn", getFruitInfo);


function getFruitInfo() {

    var fruit = $(this).attr("data-fruit");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fruit + "&api_key=FBdWHSZab9JBPkWwtVkAFOxQlrsHb33u&limit=10";

    $.ajax({

        url: queryURL,

        method: "GET"

    }).then(function(response) {

        var result = response.data;

        for (var i = 0; i < result.length; i++){

        var fruitDiv = $("<div>");

            fruitDiv.addClass("fruit-div")

        var p = $("<p>");

            p.addClass("col-md-2")

            p.text(result[i].rating)
            
        var fruitImg = $("<img>");

            fruitImg.attr('src', result[i].images.fixed_height_still.url)

            fruitImg.attr('data-animate', result[i].images.fixed_height.url)

            fruitImg.attr('data-still', result[i].images.fixed_height_still.url)

            fruitImg.attr('data-state', 'still');

            fruitImg.addClass("fruitGif img-responsive img-thumbnail")

            


            fruitDiv.append(fruitImg);

            fruitDiv.append(p)

        $("#imageShow").prepend(fruitDiv);

        }
    })
}

$("#imageShow").on("click", ".fruitGif", stillAnimate);

function stillAnimate(){
        if ($(this).attr('data-state') == 'still') {
            
            $(this).attr('src', $(this).attr('data-animate'));

            $(this).attr('data-state', 'animate');
        }

        else {

            $(this).attr('src', $(this).attr('data-still'));

            $(this).attr('data-state', 'still');
        }
    }
