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
        <div class="date-stamp">${data.created_at}</div>
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
  renderTweets(sampleData);
});

//create variables for various parts on the page
// const $tweetSubmitButton = $("#tweet-submit-button");
// const $tweetList = $(".tweet-list");
// const $newTweetField = $("#tweet-text");

// listen for the submit event to occur
// $tweetSubmitButton.on("submit", (event) => {
//   event.preventDefault();
//   const inputValue = $newTweetField.val();
//   const $newArticle = $("<article>").text(inputValue).addClass("tweet");
//   $tweetList.prepend($newArticle);
//   $newTweetField.val("").focus();
// });
