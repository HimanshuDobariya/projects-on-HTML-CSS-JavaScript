const checkBoxs = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

let completedGoalCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${(completedGoalCount / inputFields.length) * 100}%`;

progressValue.firstElementChild.innerHTML = `${completedGoalCount} / ${inputFields.length} completed`;

progressLabel.innerHTML = allQuotes[completedGoalCount];

checkBoxs.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    let isAllGoalComplete = [...inputFields].every((input) => input.value);
    if (isAllGoalComplete) {
      checkbox.parentElement.classList.toggle("completed");

      const inputId = checkbox.nextElementSibling.id;

      allGoals[inputId].completed = !allGoals[inputId].completed;

      completedGoalCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressValue.style.width = `${(completedGoalCount / inputFields.length) * 100}%`;

      progressValue.firstElementChild.innerHTML = `${completedGoalCount} / 3 completed`;

      progressLabel.innerHTML = allQuotes[completedGoalCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorLabel.style.display = "block";
      setTimeout(() => {
        errorLabel.style.display = "none";
      }, 2500);
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("input", () => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id].name = input.value;

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    console.log(allGoals);
  });
});
