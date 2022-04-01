/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escapeFunc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (data) {
  const postTimeAgo = timeago.format(data.created_at);
  const safeText = escapeFunc(data.content.text);
  const $tweetHTML = $(`
    <article class="tweet">
      <header>
        <div class="display-name-avatar">
          <img src="${data.user.avatars}" alt="" />${data.user.name}
        </div>
        <div class="username">${data.user.handle}</div>
      </header>
      <p>
        ${safeText}
      </p>
      <footer>
        <div class="date-stamp">${postTimeAgo}</div>
        <div class="tweet-icons">
          <a href=""><i class="fa-solid fa-flag"></i></a>
          <a href=""><i class="fa-solid fa-retweet"></i></a>
          <a href=""><i class="fa-solid fa-heart"></i></a>
        </div>
      </footer>
      </article>
  `);
  return $tweetHTML;
};
const renderTweets = function (data) {
  for (const tweet of data) {
    $(".tweet-list").prepend(createTweetElement(tweet));
  }
};

const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then((tweetsJSON) => {
    // console.log("Success: ", morePostsHtml);
    $(".tweets-list").prepend(renderTweets(tweetsJSON));
  });
};

$(document).ready(function () {
  // listen for the submit event to occur
  // renderTweets(sampleData);

  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const tweetData = $("#tweet-text").val();
    if (tweetData === "" || tweetData === null) {
      $("#tweet-errors")
        .html("Your tweet is empty, please add some text!")
        .slideDown("slow")
        .css("display", "block");
    } else if (tweetData.length > 140) {
      return $("#tweet-errors")
        .html("Tweet is too long, please use a maximum of 140 characters.")
        .slideDown("slow")
        .css("display", "block");
    } else {
      $("#tweet-errors").slideUp("slow");
    }
    const data = $(this).serialize();
    $.post("/tweets", data).then(() => {
      console.log("post complete", this);

      $("#tweet-list").empty();
      // load tweets function
      loadTweets();
      $("#tweet-form").trigger("reset");
    });
  });

  loadTweets();
});

//create variables for various parts on the page
// const $tweetSubmitButton = $("#tweet-submit-button");
// const $tweetList = $(".tweet-list");
// const $newTweetField = $("#tweet-text");
