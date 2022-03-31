$(document).ready(function () {
  const $newTweetField = $("#tweet-text");

  // count characters in tweet box
  $newTweetField.on("input", function () {
    const maxLength = 140;
    // const maxLength = $(this).attr("maxlength");
    const characters = $(this).val().length;
    const counter = maxLength - characters;
    const $characterCounterOutput = $(".chars-remaining");
    $characterCounterOutput.val(counter);
    if (counter < 0) {
      $characterCounterOutput.css("color", "red");
    } else {
      $characterCounterOutput.css("color", "#444444");
    }
  });
});
