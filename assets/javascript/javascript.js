$(document).ready(function(){
//Intial Array of Sports//
  var gifTopics=[
    "tennis", "soccer","football","basketball","ping pong","hockey","wrestling","volleyball","golf","handball"
  ];
//Creating Buttons//
  function createButtons() {
    $("#buttonSpot").empty();
    for (var i=0; i<gifTopics.length; i++) {
        var button=$("<button class='gifButton'>");
        button.attr("value",gifTopics[i]);
        button.attr("class","button-gif");
        button.text(gifTopics[i]);
        $("#buttonSpot").append(button);
    };
  };
//Displaying 10 Still GIFs//
  function gifShow(apiObject,buttonSpot){
    $("#gif-here").empty();
    var gifCount=10;
    for (var i=0; i<gifCount; i++){ //Loop Creating GIFs//
      var gifStill= apiObject.data[i].images.fixed_height_still.url;
      var gifAnimated=apiObject.data[i].images.fixed_height.url;
      var gifImg=$("<img src='" + gifStill + "'>");
      gifImg.attr("alt",buttonSpot);//If GIF DOES NOT DISPLAY//
      gifImg.attr("data-still",gifStill);
      gifImg.attr("data-animated",gifAnimated);
      gifImg.attr("data-state","still");//Checking if Animated or Still//
      gifImg.attr("class", "gifsPulled");
      var rating=$("<p>");
      rating.text("rating: " + apiObject.data[i].rating);//Display Rating//
      var div=$("<div>");
      div.attr("id","img"+(i+1)); //So that I may style the GIFs//
      div.append(gifImg);
      div.append(rating);
      $("#gif-here").append(div);
    }
  };
  createButtons();
//Click for GIFs//
  $(document).on("click", ".button-gif", function(event) {
    var buttonSpot=$(this).attr("value"); //.get as a wrapper for $.ajax
    $.get("https://api.giphy.com/v1/gifs/search?api_key=Km6OIYQrHThqmal2XQyxjDffS1spiIIj&q=" + buttonSpot +"&limit=10&offset=0&rating=R&lang=en").done(function(response){
    gifShow(response, buttonSpot);
    var audioElement=document.createElement("audio");
    audioElement.setAttribute("src", "assets/audio/cheer_clap.mp3");
    audioElement.play();
    });
  });
//Addition of Buttons//
  $("#submit").on("click", function(event){
    event.preventDefault(); //Prevents Page Reload//
    var userChoice=$("#choices").val();  
    gifTopics.push(userChoice);//Adds User Choice to Array//
    createButtons();   
  });
//Click on GIF Flips Still/Animate
$(document).on("click",".gifsPulled", function(){
  var state=$(this).attr("data-state");
  if (state === "still"){
    $(this).attr("src",$(this).attr("data-animated"));
    $(this).attr("data-state","animate");
  } else{
    $(this).attr("src",$(this).attr("data-still"));
    $(this).attr("data-state","still"); 
  };
  });
});