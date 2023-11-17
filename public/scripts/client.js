$(document).ready(function() {

  const $characterCount = $("#charcount");


  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to render Tweets from database
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-list").prepend($tweet);
    }
  };
  // renderTweets(tweetData);

  // Create new tweet
  const createTweetElement = function(tweet) {
    let $tweet = $(`
    <article class="tweet">
    <header>
      <div class="tweet-avatar">
        <img src=${(tweet.user.avatars)}>
        <p>${(tweet.user.name)}</p>
      </div>
      <p class="tweet-handle">${(tweet.user.handle)}</p>
    </header>
    <p class="tweet-text">${escape(tweet.content.text)}</p>
    <footer>
      <p>${timeago.format(tweet.created_at, 'en_US')}</p>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);

    return $tweet;
  };

  //submit event listener 
  $("#tweet-form").on("submit", function(event) {
    // prevent the default browser behavior
    // to create a new tweet page.
    event.preventDefault();
    $characterCount.text("140");

    $(".te-error").slideUp();
    const tweetVal = $("#tweet-text").val();

    if (!tweetVal) {
      $("#no-content").slideDown();
      return;
    }
    if (tweetVal.length > 140) {
      $("#too-many-chars").slideDown();
      return;
    }

    const serializeData = $(this).serialize();
    console.log(serializeData);


    // AJAX POST/GET requestS
    $.ajax({
      url: "/tweets",
      type: "POST",
      data: serializeData,
    })
      .then((response) => {
        $("#tweet-text").val("");
        loadTweets();
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("error:", error);
      });

    const loadTweets = function() {
      // GET request
      $.ajax({
        url: "/tweets",
        type: "GET",
      })
        .then(function(tweets) {
          $(".tweet-list").empty();
          renderTweets(tweets);
        })
        .catch((error) => {
          console.log("error", error);
        });

    };
    loadTweets();

  });
});