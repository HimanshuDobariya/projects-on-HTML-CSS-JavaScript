let inputBox = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let nums = "";
let arr = Array.from(buttons);

arr.map((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      nums = eval(nums);
      inputBox.value = nums;
    } else if (e.target.innerHTML == "AC") {
      nums = "";
      inputBox.value = nums;
    } else if (e.target.innerHTML == "DEL") {
      nums = nums.substring(0, nums.length - 1);
      inputBox.value = nums;
    } else {
      nums += e.target.innerHTML;
      inputBox.value = nums;
    }
  });
});
