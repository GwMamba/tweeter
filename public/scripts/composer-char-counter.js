$(document).ready(function() {
  // --- our code goes here ---
    const $tweetText = $("#tweet-text");
    const $characterCount = $("#charcount");

  console.log($("#tweet-text"));
  console.log($("#charcount"));

  $("#tweet-text").on("input", function() {

    const text = $tweetText.val();
    const characterCount = text.length;
    $characterCount.text(140 - characterCount);

    console.log(this);

    if (characterCount > 140) {
      $characterCount.addClass("charlimit");
    } else {
      $characterCount.removeClass("charlimit");
    }

  });
});

