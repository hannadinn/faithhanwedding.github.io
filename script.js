window.onload = function() {

  var currentStage = 1;
  const correctImageNumbers = {
      "stage1": "1",
      "stage2": "3",
      "stage3": "4",
      "stage4": "2"
  };
  var images = document.getElementsByClassName('image');
  var blurElement = document.getElementById("blur");
  var bgElement = document.getElementById("bgimage");

  // Attach click event handlers to all images
  for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('click', function() {
          var filePath = this.src;
          if (currentStage === 1 && filePath.includes(correctImageNumbers.stage1 + ".jpg")) {
              triggerChangeImage(currentStage);
          }

          if (currentStage === 2 && filePath.includes(correctImageNumbers.stage2 + ".jpg")) {
              triggerChangeImage(currentStage);
          }

          if (currentStage === 3 && filePath.includes(correctImageNumbers.stage3 + ".jpg")) {
              triggerChangeImage(currentStage);
          }

          if (currentStage === 4 && filePath.includes(correctImageNumbers.stage4 + ".jpg")) {
              triggerChangeImage(currentStage);
          }
      });
  }

  function triggerChangeImage(stage) {
      // Start the unblur transition
      blurElement.style.transition = "backdrop-filter 4s ease";
      blurElement.style.backdropFilter = "blur(0px)";
      blurElement.style.webkitBackdropFilter = "blur(0px)";
      document.getElementById("content-container").style.visibility = "hidden"; // Hide content while transitioning

      setTimeout(() => {
          // After 4 seconds, update the images and background image
          changeImages(stage);
          blurElement.style.backdropFilter = "blur(8px)"; // Reapply blur
          blurElement.style.webkitBackdropFilter = "blur(8px)";
          document.getElementById("content-container").style.visibility = "visible"; // Show content again
      }, 4000);

      currentStage = stage + 1;
  }

  function changeImages(stage) {
      var newStage = stage + 1;
      if (newStage <= 4) {
          for (let index = 1; index <= 4; index++) {
              var imageId = "image" + index;
              var newImageSrc = "stage" + newStage + "/image" + index + ".jpg";
              document.getElementById(imageId).src = newImageSrc;
          }

          // Update the background image to match the correct image for the next stage
          var correctImageNumber = correctImageNumbers["stage" + newStage];
          var newBgImagePath = "stage" + newStage + "/image" + correctImageNumber + ".jpg";
          bgElement.style.backgroundImage = 'url(' + newBgImagePath + ')';

      } else {
          document.getElementById("title").innerHTML = "😴🤤";
      }
  }
    
  var popup = document.getElementById("popup");
  var okButton = document.getElementById("ok-button");
  var skipButton = document.getElementById("skip-button");
  var instructionsBar = document.getElementById("instructions-bar");
  var increaseFontScreen = document.getElementById('increase-font-screen');
  var decreaseFontScreen = document.getElementById('decrease-font-screen');
  var body = document.body;
  var redirectURL = "https://www.example.com"; // Change this to your target URL

  // Show the popup when the page loads
  popup.style.visibility = "visible";

  // Function to show the popup
  function showPopup() {
      popup.style.visibility = "visible";
      // Disable interactions with the popup content
      popup.style.pointerEvents = "auto"; // Allow interaction with the popup
  }

  // Event listener for the instructions bar
  instructionsBar.addEventListener("click", showPopup);

  // Event listener for OK button
  okButton.addEventListener("click", function() {
      popup.style.visibility = "hidden";
      popup.style.pointerEvents = "none"; // Disable interactions with the popup
  });

  // Event listener for Skip button
  skipButton.addEventListener("click", function() {
      popup.innerHTML = `
          <h2>Redirecting...</h2>
          <p>If you are not redirected in 5 seconds, <a href="${redirectURL}">click here</a>.</p>`;
      setTimeout(function() {
          window.location.href = redirectURL;
      }, 5000);
  });

  // Function to adjust font size
  function adjustFontSize(increase) {
      var currentFontSize = parseInt(window.getComputedStyle(body).fontSize);
      var newFontSize = increase ? currentFontSize + 2 : currentFontSize - 2;
      body.style.fontSize = newFontSize + 'px';
  }

  // Add event listeners for font size adjustment icons on the screen
  increaseFontScreen.addEventListener("click", function() {
      adjustFontSize(true);
  });

  decreaseFontScreen.addEventListener("click", function() {
      adjustFontSize(false);
  });

};
