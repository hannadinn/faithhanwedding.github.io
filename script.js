window.onload = function() {
  
    var currentStage = 1;
    const correctImageNumbers = {
        "stage1": "1",
        "stage2": "3",
        "stage3": "4",
        "stage4": "2"
    }
    var images = document.getElementsByClassName('image');
    var bgId = "bgimage";
    console.log(correctImageNumbers.stage1);
    console.log(correctImageNumbers["stage" + "1"]);

  
    // Attach click event handlers to all images
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('click', function() {
        
        var filePath = this.src;
        if (currentStage === 1 && filePath.includes(correctImageNumbers.stage1 + ".jpg")) {
          triggerChangeImage(currentStage);
        }

        if (currentStage === 2 && filePath.includes(correctImageNumbers.stage2 + ".jpg")) {
          triggerChangeImage(currentStage)
        }

        if (currentStage === 3 && filePath.includes(correctImageNumbers.stage3 + ".jpg")) {
          triggerChangeImage(currentStage)
        }

        if (currentStage === 4 && filePath.includes(correctImageNumbers.stage4 + ".jpg")) {
            triggerChangeImage(currentStage)
          }
      });
    }

    function triggerChangeImage(stage) {
      currentStage = 0;
      document.getElementById("content-container").style.visibility = "hidden";
      document.getElementById("blur").classList.add("unblurTransition");
      document.getElementById("blur").style.backdropFilter = "none";
      setTimeout(() => changeImages(stage), 4000);
      currentStage = stage + 1; 
    }

    function changeImages(stage) {
      var newStage = stage + 1;
      if (currentStage <= 4) {
        for (let index = 1; index < 5; index++) {
          var imageId = "image" + index;
          var newImageSrc = "stage" + newStage + "/image" + index + ".jpg";
          document.getElementById(imageId).src = newImageSrc;
        }
        var newBgImagePath = 'url(' + "stage" + newStage + "/image" + correctImageNumbers["stage" + newStage] + ".jpg)";
        document.getElementById(bgId).style.backgroundImage = newBgImagePath;
      }
      document.getElementById("blur").classList.remove("unblurTransition");
      document.getElementById("blur").style.backdropFilter = "blur(8px)";
      document.getElementById("content-container").style.visibility = "visible";
    //   if (currentStage == 2) {
    //     showAnswerByColumn(2);
    //     showAnswerByColumn(3);
    //     document.getElementById("title").innerHTML = "🎄🎄";
    //   }
    //   if (currentStage == 3) {
    //     showAnswerByColumn(4);
    //     showAnswerByColumn(6);
    //     document.getElementById("title").innerHTML = "😴🤤";
    //   }
    //   if (currentStage == 4) {
    //     showAnswerByColumn(1);
    //     showAnswerByColumn(5);
    //     var emojiArray = ["😍","🥰", "💓", "🥳", "👰", "👸", "🦊", "🌷", "🍉", "🍙", "🍜", "🥟", "🦀", "🌞", "🎉", "🎊", "💍", "👜", "📸", "♍"];
    //     var emojiLine = "";
    //     while (emojiArray.length > 0 ) {
    //       var rand = emojiArray[(Math.random() * emojiArray.length) | 0];
    //       emojiLine += rand;
    //       emojiArray = emojiArray.filter(item => item != rand);
    //     }
    //     document.getElementById("title").innerHTML = emojiLine;
    //   }
      if (currentStage == 5) {
        document.getElementById("title").innerHTML = "😴🤤";
      }
    }
  };
  