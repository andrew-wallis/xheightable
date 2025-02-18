import qaDom from "../../../utils/qaDom";
import setFontStyles from "../../../utils/setFontStyles";
import TestElement from "./TestElement";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.classList = "stack-l";
  

  // Appends

  test.appendChild(TestElement(
    "title", 
    "Pack my box with five dozen liquor jugs"
  ));

  test.appendChild(TestElement(
    "paragraph",
    "A paragraph is a distinct section of writing focused on a single idea, beginning with a topic sentence and followed by supporting sentences that develop the idea with details and evidence. It ensures coherence and clarity, enhancing readability by breaking down information into manageable segments. Effective paragraphs help writers maintain focus and coherence, contributing to a clearer and more engaging piece of writing."
  ));


  // Events

  qaDom(test, "clickable").forEach(example => {
    example.addEventListener('mouseenter', handleMouseEnter);
    example.addEventListener('mouseleave', handleMouseLeave);
    example.addEventListener('click', handleClick);

    example.addEventListener('focus', handleMouseEnter);
    example.addEventListener('blur', handleMouseLeave);
    example.addEventListener('keydown', handleKeyDown);
  });


  // Functions

  function updateTestScreen() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    processExamples(qaDom(test, "primary", "font"), primaryFont);
    processExamples(qaDom(test, "secondary", "font"), secondaryFont);

    function processExamples(examples, font) {
      examples.forEach((example) => {
        if(example.dataset.fontFamily !== font.label) {
          updateFont(example, font);
        }
      });
    }
  }

  store.subscribe(updateTestScreen);
  updateTestScreen();


  function handleMouseEnter(e) {
    const element = e.target;
    const type = element.dataset.example;
    qaDom(test, type, "example").forEach((match) => {
      match.classList.add("test-highlighted");
    });
  }

  function handleMouseLeave(e) {
    const element = e.target;
    const type = element.dataset.example;
    qaDom(test, type, "example").forEach((match) => {
      match.classList.remove("test-highlighted");
    });
  }

  function handleClick(e) {
    const element = e.target;
    const type = element.dataset.example;

    let font;
    let fontType;

    if(element.dataset.font === "primary") {
      font = store.getData().secondaryFont;
      fontType = "secondary";
    } else {
      font = store.getData().primaryFont;
      fontType = "primary";
    }

    qaDom(test, type, "example").forEach((match) => {
      match.classList.remove("test-highlighted");
      match.dataset.font = fontType;
      updateFont(match, font);
    });

  }
  
  function handleKeyDown(e) {
    if(e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  }

  function updateFont(example, font) {
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const fontSize = isMobile ? 0.875 : 1;

    setFontStyles({
      element: example, 
      font: font, 
      size: example.dataset.size * fontSize, 
      weight: example.dataset.weight,
      leading: font[example.dataset.leading]
    });
    example.dataset.fontFamily = font.label;
  }


  // Return

  return test;

}

export default Test;