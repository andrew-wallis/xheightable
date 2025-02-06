import qaDom from "../../../utils/qaDom";
import setFontStyles from "../../../utils/setFontStyles";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.style.display = "none";
  test.dataset.section = "Test";
  test.dataset.element = "section";
  
  /* html */
  test.innerHTML = `
    <div class="stack-xl">
      <div class="grid-xl columns-1-3">
        <div class="span-2 stack test">
          <h2 class="clickable uppercase" data-element="clickable" data-example="title" data-font="primary" data-size="2.5" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a title</h2>
          <hr/>
          <p><em class="secondary clickable" data-element="clickable" data-example="lede" data-font="secondary" data-size="1.125" data-leading="lineMax" data-weight="normal" data-fontFamily="">A lede serves as the introductory sentence or paragraph of an article, capturing the reader's attention by summarizing the most essential information, setting the tone, and encouraging further reading.</em></p>
          <ul class="cluster secondary inline">
            <li class="clickable" data-element="clickable" data-example="byline" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">A. N. Author</li>
            <li class="clickable" data-element="clickable" data-example="byline" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">20th December 2025</li>
          </ul>
        </div>
      </div>
      <div class="grid-xl columns-1-3">
        <div class="span-2 stack-m test">
          <p class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">A paragraph is a distinct section of writing focused on a single idea, beginning with a topic sentence and followed by supporting sentences that develop the idea with details and evidence. It ensures coherence and clarity, enhancing readability by breaking down information into manageable segments. Effective paragraphs help writers maintain focus and coherence, contributing to a clearer and more engaging piece of writing.</p>
          <h3 class="test-heading clickable" data-element="clickable" data-example="heading" data-font="primary" data-size="1.6" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a heading</h3>
          <p class="clickable clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">A second paragraph introduces a new but related idea, providing further depth and context. It expands the discussion with additional evidence or explores different facets of the topic, maintaining the reader's interest. Serving as a bridge from the introduction to the body, it ensures a logical flow and reinforces the overall coherence and structure of the writing.</p>
          <h4 class="test-subheading uppercase clickable" data-element="clickable" data-example="subheading" data-font="primary" data-size="1.125" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a subheading</h4>
          <p class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">Using lists in writing offers several benefits:</p>
          <ul class="test-list">
            <li class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Clarity</strong>: Lists make information easier to read and understand.</li>
            <li class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Organization</strong>: They help structure content, highlighting key points.</li>
            <li class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Emphasis</strong>: Lists draw attention to important details and steps.</li>
          </ul>
        </div>
        <div class="stack stack-xl test" data-element="test-sidebar">
          <div class="stack" data-element="test-blockquote">
            <blockquote class="clickable" data-element="clickable" data-example="quote" data-font="primary" data-size="1.125" data-leading="lineMin" data-weight="normal" data-fontFamily="">Blockquotes are a powerful way to highlight key points or notable quotes, drawing the reader's attention with a distinctive format.</blockquote>
            <hr/>
            <cite class="slub clickable" data-element="clickable" data-example="citation" data-font="secondary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">A. N. Author</cite>
          </div>
          <aside class="test-form stack stack-m" data-element="test-form">
            <h3 class="clickable uppercase" data-element="clickable" data-example="subheading" data-font="secondary" data-size="1" data-leading="lineMin" data-weight="bold">This is a form</h3>
            <hr/>
            <div class="stack">
              <div class="test-label clickable" data-element="clickable" data-example="label" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="normal">This is a label</div>
              <div class="test-input clickable" data-element="clickable" data-example="label" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="normal">This an input field</div>
            </div>
            <div class="test-checkbox-wrapper">
              <div class="test-checkbox"></div>
              <div class="test-checkbox-label clickable" data-element="clickable" data-example="label" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="normal">This is a checkbox</div>
            </div>
            <hr/>
            <div class="test-button clickable" data-element="clickable" data-example="button" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold">
              This is a button
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;


  // Events

  qaDom(test, "clickable").forEach(example => {
    example.addEventListener('mouseenter', handleMouseEnter);
    example.addEventListener('mouseleave', handleMouseLeave);
    example.addEventListener('click', handleClick);
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