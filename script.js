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
    var languagePopup = document.getElementById("language-popup");
    var popup = document.getElementById("popup");
    var okButton = document.getElementById("ok-button");
    var skipButton = document.getElementById("skip-button");
    var instructionsBar = document.getElementById("instructions-bar");
    var englishButton = document.getElementById("english-button");
    var chineseButton = document.getElementById("chinese-button");
    var titleElement = document.getElementById("title");
    var increaseFontScreen = document.getElementById('increase-font-screen');
    var decreaseFontScreen = document.getElementById('decrease-font-screen');
    var body = document.body;
    var redirectURL = "https://withjoy.com/lai-and-lim-jun-25"; // Change this to your target URL
    var selectedLanguage = 'en'; // Default language

    // Text content for different languages
    const translations = {
        en: {
            instructionsHeader: "Instructions",
            instructions: "Click on the correct picture to progress to the next stage.",
            skipButton: "Skip",
            okButton: "OK",
            languagePopupTitle: "Select Language",
            congratulations: "Congratulations! You completed the game!",
            redirecting: "Redirecting to RSVP website in 5 seconds...",
            proceed: "Proceed",
            instructionsBar: "Instructions",
            titleText: "Click on the image in the grid similar to the background image!"
        },
        zh: {
            instructionsHeader: "说明",
            instructions: "点击正确的图片进入下一关。",
            skipButton: "跳过",
            okButton: "确定",
            languagePopupTitle: "选择语言",
            congratulations: "恭喜你完成了游戏！",
            redirecting: "5秒后将跳转到RSVP网站...",
            proceed: "继续",
            instructionsBar: "说明",
            titleText: "点击与背景图像相似的网格中的图像！"
        }
    };

    // Ensure the instructions popup is hidden initially
    popup.style.visibility = "hidden";

    // Show the language selection popup when the page loads
    languagePopup.style.visibility = "visible";

    // Function to switch language based on user selection
    function switchLanguage(lang) {
        selectedLanguage = lang;

        // Update text content based on the selected language
        instructionsBar.textContent = translations[lang].instructionsBar;
        popup.querySelector('h2').textContent = translations[lang].instructionsHeader;
        popup.querySelector('p').textContent = translations[lang].instructions;
        okButton.textContent = translations[lang].okButton;
        skipButton.textContent = translations[lang].skipButton;
        titleElement.textContent = translations[lang].titleText;

        // Hide the language popup and show the instructions popup
        languagePopup.style.visibility = "hidden";
        showPopup(translations[lang].instructions);
    }



    // Function to show the popup with a custom message and a flag for final state
    function showPopup(message, final = false) {
        if (final) {
            // Update the h2 element with emojis and the congratulatory message
            popup.querySelector('h2').textContent = "🥳🎊🤵‍♂️👰‍♀️🎊🥳";
    
            popup.querySelector('p').textContent = translations[selectedLanguage].redirecting;
    
            // Remove existing buttons and create a new one
            popup.querySelectorAll('button').forEach(button => button.remove());
    
            var proceedButton = document.createElement('button');
            proceedButton.textContent = translations[selectedLanguage].proceed;
            proceedButton.onclick = function() {
                proceedButton.disabled = true; // Disable the button after it is clicked
                window.location.href = redirectURL;
            };
            popup.querySelector('.popup-content').appendChild(proceedButton);
    
            // Automatically redirect after 5 seconds
            setTimeout(function() {
                proceedButton.disabled = true; // Ensure the button is disabled before auto-redirect
                window.location.href = redirectURL;
            }, 5000);
        } else {
            // For other popups, use the standard header
            popup.querySelector('h2').textContent = translations[selectedLanguage].instructionsHeader;
            popup.querySelector('p').textContent = message;
            body.style.pointerEvents = "none"; // Disable interactions with the rest of the page
            popup.style.pointerEvents = "auto"; // Allow interaction with the popup
        }
    
        popup.style.visibility = "visible";
    }
    

    // Event listeners for language buttons
    englishButton.addEventListener("click", function() {
        switchLanguage('en');
    });

    chineseButton.addEventListener("click", function() {
        switchLanguage('zh');
    });

    // Event listener for the instructions bar
    instructionsBar.addEventListener("click", function() {
        showPopup(translations[selectedLanguage].instructions);
    });

    // Event listener for OK button
    okButton.addEventListener("click", function() {
        popup.style.visibility = "hidden";
        body.style.pointerEvents = "auto"; // Enable interactions with the rest of the page
    });

    // Event listener for Skip button
    skipButton.addEventListener("click", function() {
        showPopup(translations[selectedLanguage].redirecting, true);
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

    // Attach click event handlers to all images
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function() {
            var filePath = this.src;
            if (filePath.includes(correctImageNumbers["stage" + currentStage] + ".jpg")) {
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
            if (stage === 4) {
                // Show confetti and popup when the correct image is clicked in the final stage
                showConfetti();
                setTimeout(() => {
                    showPopup("Congratulations! You completed the game!", true);
                }, 1000);
            } else {
                // Only change the images if it's not the final stage
                changeImages(stage);
                blurElement.style.backdropFilter = "blur(8px)"; // Reapply blur
                blurElement.style.webkitBackdropFilter = "blur(8px)";
                document.getElementById("content-container").style.visibility = "visible"; // Show content again
            }
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
        }
    }

    function showConfetti() {
        const duration = 2 * 1000; // 2 seconds duration
        const end = Date.now() + duration;
    
        (function frame() {
            confetti({
                particleCount: 100,
                startVelocity: 30,
                spread: 120,
                ticks: 60,
                origin: {
                    x: Math.random(),
                    // Randomize the confetti start point along the y-axis
                    y: Math.random() - 0.2
                },
                colors: ['#0047ab', '#ffd700', '#1e90ff', '#f0e130'], // Blue and gold tones
                scalar: 1.2
            });
    
            // Keep firing confetti until the duration ends
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }    
};
