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
};
