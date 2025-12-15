function initStory({ lines }) {
  const story = document.getElementById("story");
  const continueWrap = document.getElementById("continueWrap");
  const choices = document.getElementById("choices");
  const btnContinue = document.getElementById("btnContinue");

  let line = 0;
  let char = 0;
  let typing = null;

  function showChoices() {
    continueWrap.classList.add("hidden");
    choices.classList.add("visible");
  }

  function typeLine() {
    if (typing) clearInterval(typing);
    typing = null;
    story.textContent = "";
    char = 0;

    typing = setInterval(() => {
      char++;
      story.textContent = lines[line].slice(0, char);

      if (char >= lines[line].length) {
        char = lines[line].length;
        clearInterval(typing);
        typing = null;
        if (line === lines.length - 1) showChoices();
      }
    }, 24);
  }

  function advanceStory() {
    if (typing) {
      clearInterval(typing);
      typing = null;
      char = lines[line].length;
      story.textContent = lines[line];
      if (line === lines.length - 1) showChoices();
      return;
    }

    if (line < lines.length - 1) {
      line++;
      typeLine();
    } else {
      showChoices();
    }
  }

  btnContinue.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    advanceStory();
  }, { passive: false });

  story.classList.add("visible");
  typeLine();
}
