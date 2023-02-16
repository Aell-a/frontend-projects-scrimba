document.getElementById("get-color").addEventListener("click", (e) => {
  e.preventDefault();
  const hex = document.getElementById("color-select").value.slice(1, 7);
  const mode = document.getElementById("type-select").value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=4`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("color-seed").style.background = "#" + hex;
      document.getElementById("hex-seed").textContent = "#" + hex.toUpperCase();
      for (i = 0; i < data.colors.length; i++) {
        document.getElementById(`color-${i + 1}`).style.background =
          data.colors[i].hex.value;
        document.getElementById(`hex-${i + 1}`).textContent =
          data.colors[i].hex.value;
      }
    });
});

const colorElements = document.getElementsByClassName("color");

for (i = 0; i < colorElements.length; i++) {
  colorElements[i].addEventListener("click", (e) => {
    copyColor(e.target.id);
  });
}

function copyColor(id) {
  navigator.clipboard.writeText(
    document.getElementById(`${id}`).style.background
  );
}
