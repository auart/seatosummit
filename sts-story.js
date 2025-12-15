// sts-story.js

export function initStory({
  lines,
  storyEl,
  continueBtn,
  continueWrap,
  choicesEl,
  typeSpeed = 24
}) {
  let line = 0;
  let char = 0;
  let typing = null;

  function showChoices() {
    continueWrap.classList.add("hidden");
    choicesEl.classList.add("visible");
  }

  function typeLine() {
    if (typing) clearInterval(typing);
    typing = null;

    storyEl.textContent = "";
    char = 0;

    typing = setInterval(() => {
      char++;
      storyEl.textContent = lines[line].slice(0, char);

      if (char >= lines[line].length) {
        char = lines[line].length;
        clearInterval(typing);
        typing = null;
        if (line === lines.length - 1) showChoices();
      }
    }, typeSpeed);
  }

  function advanceStory() {
    if (typing) {
      clearInterval(typing);
      typing = null;
      char = lines[line].length;
      storyEl.textContent = lines[line];
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

  continueBtn.addEventListener(
    "pointerdown",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      advanceStory();
    },
    { passive: false }
  );

  storyEl.classList.add("visible");
  typeLine();
}
