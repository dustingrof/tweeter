/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(document).ready(function () {
  
  //to protect against cross site scripting attaks, used in the createTweetElement below
  const escapeFunc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Used as a template to create each tweet via AJAX
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

  // Prevent page refresh on submit of tweet form
  // Check if new tweet form is empty or over character limit
  // Display errors if true, hide when valid input is submitted
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

    // On form submission serialize the data and send it to /tweets
    // Then empty the tweet list and reload the tweets in reverse chronological order
    // Reset the form and focus the curser back in there
    const data = $(this).serialize();
    $.post("/tweets", data).then(() => {
      $("#tweet-list").empty();
      loadTweets();
      $("#tweet-form").trigger("reset");
      $("#tweet-text").focus();
    });
  });
  // Load all the tweets after the document has loaded
  loadTweets();
});
