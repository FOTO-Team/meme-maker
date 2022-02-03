const imageFileInput = document.querySelector("#imageFileInput");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
let image;

const canvas = document.querySelector("#meme");

window.addEventListener("load", (event) => {
  image = new Image();
  image.src = "./assets/images/selectImage.jpg";
  image.addEventListener("load", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
  });
});

/* //Upload your own image 
imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  image = new Image();
  image.src = imageDataUrl;
  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});
*/

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function getLines(ctx, text, maxWidth) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];
  console.log(words);
  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    console.log(width);
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function updateMemeCanvas(canvas, image, topTextInput, bottomTextInput) {
  //console.log("Updating meme canvas...");
  //console.log(canvas);
  //console.log(image);
  //console.log(topTextInput);
  //console.log(bottomTextInput);
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 12);
  const yOffset = height / 25;

  //Update Canvas Background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  //Prepare Text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  //Add top text

  if (topTextInput != "") {
    let topLines = getLines(ctx, topTextInput, 1300);
    console.log(topLines);
    ctx.textBaseline = "top";
    console.log(topLines.length);
    ctx.strokeText(topLines[0], width / 2, yOffset);
    ctx.fillText(topLines[0], width / 2, yOffset);
    if (topLines.length >= 2) {
      ctx.strokeText(topLines[1], width / 2, yOffset * 4);
      ctx.fillText(topLines[1], width / 2, yOffset * 4);
    }
    if (topLines.length >= 3) {
      ctx.strokeText(topLines[2], width / 2, yOffset * 7);
      ctx.fillText(topLines[2], width / 2, yOffset * 7);
    }
    if (topLines.length >= 4) {
      alert("Please write less text in the top text input field.");
    }
  } else {
    ctx.textBaseline = "top";
    ctx.strokeText(topTextInput, width / 2, yOffset);
    ctx.fillText(topTextInput, width / 2, yOffset);
  }

  //Add bottom text
  if (bottomTextInput != "") {
    let bottomLines = getLines(ctx, bottomTextInput, 1300);
    console.log(bottomLines);
    ctx.textBaseline = "bottom";
    if (bottomLines.length == 1) {
      ctx.strokeText(bottomLines[0], width / 2, height - yOffset);
      ctx.fillText(bottomLines[0], width / 2, height - yOffset);
    }
    if (bottomLines.length == 2) {
      ctx.strokeText(bottomLines[0], width / 2, height - yOffset * 4);
      ctx.fillText(bottomLines[0], width / 2, height - yOffset * 4);
      ctx.strokeText(bottomLines[1], width / 2, height - yOffset);
      ctx.fillText(bottomLines[1], width / 2, height - yOffset);
    }
    if (bottomLines.length == 3) {
      ctx.strokeText(bottomLines[0], width / 2, height - yOffset * 7);
      ctx.fillText(bottomLines[0], width / 2, height - yOffset * 7);
      ctx.strokeText(bottomLines[1], width / 2, height - yOffset * 4);
      ctx.fillText(bottomLines[1], width / 2, height - yOffset * 4);
      ctx.strokeText(bottomLines[2], width / 2, height - yOffset);
      ctx.fillText(bottomLines[2], width / 2, height - yOffset);
    }
    if (bottomLines.length == 4) {
      alert("Please write less text in the top text input field.");
    }
  } else {
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomTextInput, width / 2, height - yOffset);
    ctx.fillText(bottomTextInput, width / 2, height - yOffset);
  }
}

var currentValue = 0;
function handleClick(imageSelection) {
  //alert("Old value: " + currentValue);
  //alert("New value: " + imageSelection.value);
  currentValue = imageSelection.value;
  image = new Image();
  console.log(currentValue);
  if (currentValue === "image1") {
    image.src = "./assets/images/meme1.png";
  } else if (currentValue === "image2") {
    image.src = "./assets/images/meme2.png";
  }
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
}

function download() {
  var dt = canvas.toDataURL("image/jpeg");
  this.href = dt;
}
downloadLnk.addEventListener("click", download, false);
