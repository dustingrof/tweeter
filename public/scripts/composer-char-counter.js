$(document).ready(function () {
  const $tweetList = $(".tweet-list");
  const $newTweetField = $("#tweet-text");
  const $tweetSubmitButton = $("#tweet-submit-button");

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
    }
  });

  // listen for the click event to occur
  $tweetSubmitButton.on("submit", (event) => {
    event.preventDefault();
    const inputValue = $newTweetField.val();
    const $newArticle = $("<article>").text(inputValue).addClass("tweet");
    $tweetList.prepend($newArticle);
    $newTweetField.val("").focus();
  });
});
