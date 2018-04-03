/*


Things this should be able to do:
    1. Display some initial working options, similar to [movies] from the examples
    2. Add additional buttons
    3. Those buttons when clicked create a set of divs, like [movies] which will then replace the ones on the screen currently
    4. Those gifs should be able to be paused


*/
var queryURL = ""

var fruit = ["apple", "banana", "strawberry"];

$(document).ready(
    renderButtons
)

$("#add-fruit").on("click", function () {
    event.preventDefault();
    var fruits = $("#fruit-input").val().trim();
    fruit.push(fruits)
    renderButtons();
})

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < fruit.length; i++) {
        var a = $("<button>");
        a.addClass("fruit-btn");
        a.attr("data-fruit", fruit[i]);
        a.text(fruit[i]);
        $("#buttons-view").append(a);
    }
}




$("#buttons-view").on("click", getFruitInfo)


function getFruitInfo() {

    var fruit = $(this).attr('data-fruit');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fruit + "&api_key=FBdWHSZab9JBPkWwtVkAFOxQlrsHb33u&limit=5";




    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {


        var result = response.data;
        console.log(result)
        for (var i = 0; i < result[i].length; i++){

        var a = $('<div>');
        var img = result.images
        a.append(img)
        $("#imageShow").prepend(a);
        }
    })


    $(this).attr("data-query")
}