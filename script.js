window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

window.addEventListener("load", () => {
  alert("Please allow mic permission to make notes of what you speak.");
});

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0].transcript)
    .join("");
  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
  }
});

recognition.addEventListener("end", recognition.start);

recognition.start();

const writing = document.querySelector(".writing");

writing.addEventListener("click", (e) => {
  document.documentElement.style.setProperty(
    "--curFont",
    `var(--font${e.target.dataset.val})`
  );
});

window.onbeforeunload = function () {
  return "Are You Sure you will loose your data";
};
