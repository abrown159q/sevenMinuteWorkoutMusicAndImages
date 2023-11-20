document.addEventListener("DOMContentLoaded", function () {
  const workoutContainer = document.getElementById("workout-container");
  const timerElement = document.getElementById("timer");
  const nextStepElement = document.getElementById("next-step");
  const startButton = document.getElementById("start-button");
  const exerciseBell = new Audio("exerciseBell.mp3");
  const breakBell = new Audio("breakBell.mp3");
  const speakOptions = { rate: 1.0, pitch: 1.0, volume: 1.0 };

  let currentStep = -1;
  let isPaused = true;
  let timer;
  const restDuration = 3; // 3 seconds for testing

const steps = [
  {
    name: "Jumping Jacks",
    image: "jumping_jacks.png",
    duration: 30
  },
  {
    name: "Wall Sit",
    image: "wall_sit.png",
    duration: 30
  },
  {
    name: "Push-Ups",
    image: "push_ups.png",
    duration: 30
  },
  {
    name: "Abdominal Crunches",
    image: "abdominal_crunches.png",
    duration: 30
  },
  {
    name: "Step-Ups",
    image: "step_ups.png",
    duration: 30
  },
  {
    name: "Squats",
    image: "squats.png",
    duration: 30
  },
  {
    name: "Triceps Dips",
    image: "triceps_dips.png",
    duration: 30
  },
  {
    name: "Planks",
    image: "planks.png",
    duration: 30
  },
  {
    name: "High Knees Running in Place",
    image: "high_knees.png",
    duration: 30
  },
  {
    name: "Lunges",
    image: "lunges.png",
    duration: 30
  },
  {
    name: "Push-Ups with Rotation",
    image: "push_ups_rotation.png",
    duration: 30
  },
  {
    name: "Side Planks",
    image: "side_planks.png",
    duration: 30
  }
];


  function showStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      const step = steps[stepIndex];
      workoutContainer.innerHTML = `
        <div class="workout-step">
          <h2>${step.name}</h2>
          <img src="${step.image}" alt="${step.name}">
        </div>
      `;
      speakStepName(step.name);
      const duration = step.duration || 0;
      startTimer(duration, stepIndex);
    }
  }

  function startTimer(duration, stepIndex) {
    clearInterval(timer);
    let timeLeft = duration;
    timerElement.textContent = timeLeft;
    currentStep = stepIndex;
    isPaused = false;
    updateUI();
    timer = setInterval(function () {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        if (stepIndex < steps.length - 1) {
          breakBell.play();
          showBreak(stepIndex);
        } else {
          exerciseBell.play();
          workoutComplete();
        }
      }
    }, 1000);
  }

  function showBreak(stepIndex) {
    workoutContainer.innerHTML = `
      <div class="workout-step">
        <h2>Break</h2>
        <div id="timer"></div>
        <div id="next-step">Next Step: ${
          steps[currentStep + 1].name
        }</div>
      </div>
    `;
    speakStepName("Break");
    const duration = restDuration || 0;
    startTimer(duration, stepIndex + 1);
  }

  function workoutComplete() {
    workoutContainer.innerHTML = `
      <div class="workout-step">
        <h2>Workout Complete!</h2>
      </div>
    `;
    currentStep = -1;
    isPaused = true;
    updateUI();
  }

  function togglePause() {
    if (isPaused) {
      startButton.textContent = "Pause";
      isPaused = false;
      startTimer(Number(timerElement.textContent), currentStep);
    } else {
      startButton.textContent = "Resume";
      clearInterval(timer);
      isPaused = true;
    }
  }

  function updateUI() {
    if (currentStep === -1) {
      document.body.className = "active";
    } else {
      document.body.className = isPaused ? "resting" : "active";
    }
  }

  function speakStepName(stepName) {
    const speech = new SpeechSynthesisUtterance(stepName);
    Object.assign(speech, speakOptions);
    speechSynthesis.speak(speech);
  }

  startButton.addEventListener("click", function () {
    if (currentStep === -1) {
      showStep(0);
      startButton.textContent = "Pause";
    } else {
      togglePause();
    }
    updateUI();
  });
});
