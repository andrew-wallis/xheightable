import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import setFontStyles from "../../../utils/setFontStyles";
import TestElement from "./TestElement";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.style.display = "none";
  test.dataset.section = "Test";
  test.dataset.element = "section";
  test.role = "tabpanel";
  test.setAttribute("aria-labelledby", "test-tab");
  
  /* html */
  test.innerHTML = `
    <h2 data-element="section-title" tabindex="-1" class="sr-only">Test</h2>
    <div class="stack-xl">
      <div class="grid-xl columns-1-3">
        <div data-element="test-byline" class="span-2 stack test">
          <!-- Test Byline -->
        </div>
      </div>
      <div class="grid-xl columns-1-3">
        <div data-element="test-article" class="span-2 stack-m test">
          <!-- Test Article -->
        </div>
        <div class="stack stack-xl test" data-element="test-sidebar">
          <div class="stack" data-element="test-quote">
            <!-- Test Quote -->
          </div>
          <aside class="test-form stack stack-m" data-element="test-form">
            <div data-element="test-form-title">
              <!-- Test form title -->
            </div>
            <hr/>
            <div class="stack" data-element="test-form-input">
              <!-- Test form input -->
            </div>
            <div class="test-checkbox-wrapper" data-element="test-form-checkbox">
              <div class="test-checkbox"></div>
              <!-- Test form checkbox -->
            </div>
            <hr/>
            <div data-element="test-form-button">
              <!-- Test button -->
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;


  // Appends

  const byline = qDom(test, "test-byline");

  byline.appendChild(TestElement(
    "title", 
    "This is a title"
  ));
  
  byline.appendChild(document.createElement("hr"));

  byline.appendChild(TestElement(
    "lede",
    "A lede serves as the introductory sentence or paragraph of an article, capturing the reader's attention by summarizing the most essential information, setting the tone, and encouraging further reading."
  ));

  byline.appendChild(TestElement(
    "citation",
    ["A. N. Author", "20th December 2025"],
    "cluster secondary inline"
  ));

  const article = qDom(test, "test-article");

  article.appendChild(TestElement(
    "paragraph",
    "A paragraph is a distinct section of writing focused on a single idea, beginning with a topic sentence and followed by supporting sentences that develop the idea with details and evidence. It ensures coherence and clarity, enhancing readability by breaking down information into manageable segments. Effective paragraphs help writers maintain focus and coherence, contributing to a clearer and more engaging piece of writing."
  ));

  article.appendChild(TestElement(
    "heading",
    "This is a heading"
  ));

  article.appendChild(TestElement(
    "paragraph",
    "A second paragraph introduces a new but related idea, providing further depth and context. It expands the discussion with additional evidence or explores different facets of the topic, maintaining the reader's interest. Serving as a bridge from the introduction to the body, it ensures a logical flow and reinforces the overall coherence and structure of the writing."
  ));

  article.appendChild(TestElement(
    "subheading",
    "This is a subheading"
  ));

  article.appendChild(TestElement(
    "paragraph",
    "Using lists in writing offers several benefits:"
  ));

  article.appendChild(TestElement(
    "paragraph",
    ["Clarity: Lists make information easier to read and understand.", "Organization: They help structure content, highlighting key points.", "Emphasis: Lists draw attention to important details and steps."],
    "test-list"
  ));

  const quote = qDom(test, "test-quote");

  quote.appendChild(TestElement(
    "quote",
    "Blockquotes are a powerful way to highlight key points or notable quotes, drawing the reader's attention with a distinctive format."
  ));
  
  quote.appendChild(document.createElement("hr"));

  quote.appendChild(TestElement(
    "citation",
    "A. N. Author"
  ));

  qDom(test, "test-form-title").appendChild(TestElement(
    "subheading",
    "This is a form"
  ));

  const formInput = qDom(test, "test-form-input");

  formInput.appendChild(TestElement(
    "label",
    "This is a label",
    "test-label"
  ));
  
  formInput.appendChild(TestElement(
    "label",
    "This is an input field",
    "test-input"
  ));

  qDom(test, "test-form-checkbox").appendChild(TestElement(
    "label",
    "This is a checkbox",
    "test-checkbox-label"
  ));

  qDom(test, "test-form-button").appendChild(TestElement(
    "button",
    "This is a button",
    "test-button"
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