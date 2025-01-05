const options = ["rock", "paper", "scissors"];

const optionImages = document.querySelectorAll(".option_image");
const userResult = document.querySelector(".user-result img");
const cpuResult = document.querySelector(".cpu-result img");
const result = document.querySelector(".result");

optionImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    // Highlight the selected option
    image.classList.add("active");

    // Remove "active" class from other options
    optionImages.forEach((otherImage, otherIndex) => {
      if (index !== otherIndex) otherImage.classList.remove("active");
    });

    // Add shake animation to user and CPU images multiple times
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      userResult.classList.add("shake");
      cpuResult.classList.add("shake");

      // Remove shake animation after one cycle
      setTimeout(() => {
        userResult.classList.remove("shake");
        cpuResult.classList.remove("shake");
      }, 500);

      shakeCount++;

      // Stop shaking after 4-5 cycles
      if (shakeCount >= 5) {
        clearInterval(shakeInterval);

        // Update user result
        const userChoice = options[index];
        userResult.src = `${userChoice}.png`;
        userResult.alt = userChoice;

        // Random CPU choice
        const cpuIndex = Math.floor(Math.random() * options.length);
        const cpuChoice = options[cpuIndex];
        cpuResult.src = `${cpuChoice}.png`;
        cpuResult.alt = cpuChoice;

        // Determine the winner
        let outcome;
        if (userChoice === cpuChoice) {
          outcome = "It's a tie!";
        } else if (
          (userChoice === "rock" && cpuChoice === "scissors") ||
          (userChoice === "paper" && cpuChoice === "rock") ||
          (userChoice === "scissors" && cpuChoice === "paper")
        ) {
          outcome = "You win!";
        } else {
          outcome = "CPU wins!";
        }

        // Display the result
        result.textContent = outcome;
        result.style.opacity = "1";
      }
    }, 600); // Repeat every 600ms
  });
});
