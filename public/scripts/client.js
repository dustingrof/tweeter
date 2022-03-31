/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const sampleData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (data) {
  const postTimeAgo = timeago.format(data.created_at);
  const $tweetHTML = $(`
    <article class="tweet">
      <header>
        <div class="display-name-avatar">
          <img src="${data.user.avatars}" alt="" />${data.user.name}
        </div>
        <div class="username">${data.user.handle}</div>
      </header>
      <p>
        ${data.content.text}
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
    $(".tweet-list").append(createTweetElement(tweet));
  }
};

$(document).ready(function () {
  // listen for the submit event to occur
  // renderTweets(sampleData);

  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const tweetData = $("#tweet-text").val();
    if (tweetData === "" || tweetData === null) {
      return alert("Tweet is empty!");
    } else if (tweetData.length > 140) {
      return alert("Tweet limit exceeded!");
    }
    const data = $(this).serialize();
    $.post("/tweets", data).then(() => {
      console.log("post complete");
      // load tweets function
      // loadTweets();
    });
  });

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then((tweetsJSON) => {
      // console.log("Success: ", morePostsHtml);
      $(".tweets-list").append(renderTweets(tweetsJSON));
    });
  };
  loadTweets();
});

//create variables for various parts on the page
// const $tweetSubmitButton = $("#tweet-submit-button");
// const $tweetList = $(".tweet-list");
// const $newTweetField = $("#tweet-text");
