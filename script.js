let colors = [];
let colorInput = document.getElementById("colorInput");
let colorScheme = document.getElementById("colorScheme");
const colorContainer = document.getElementById("color-container");
const hexValueContainer = document.getElementById("hexValue-container");

getColorScheme();

document.getElementById("submit-btn").addEventListener("click", function () {
  getColorScheme();
});

function getColorScheme() {
  let hexValue = colorInput.value.slice(1);
  let mode = colorScheme.value;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${mode}&count=5`,
    {
      method: "GET",
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      colors = data.colors.map((color) => {
        return color.hex.value;
      });
      let colorHtml = ``;
      let hexValueHtml = ``;
      for (let i = 0; i < colors.length; i++) {
        colorHtml += `
            <div class="color" id=${colors[i]} data-color-hex-value="hexColor" style="background-color: ${colors[i]};"></div>
        `;
        hexValueHtml += `
            <div class="color" id=${colors[i]} data-color-hex-value="hexColor">${colors[i]}</div>
        `;
      }
      colorContainer.innerHTML = colorHtml;
      hexValueContainer.innerHTML = hexValueHtml;
    });
}

document.addEventListener("click", function (e) {
  let copyText;
  if (e.target.dataset.colorHexValue === "hexColor") {
    copyText = document.getElementById(e.target.id);
    navigator.clipboard.writeText(copyText.id);
    // Alert
    alert("Copied the color code: " + copyText.id);
  }
});
