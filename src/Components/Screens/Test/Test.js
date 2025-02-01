import setFontStyles from "../../../utils/setFontStyles";

function Test(store) {

  const test = document.createElement('div');
  test.id = "test";
  test.style.display = "none";
  test.dataset.section = "Test";
  test.dataset.element = "section";
  
  /* html */
  test.innerHTML = `
    <div class="stack-xl">
      <div class="grid-s-l columns-1-3" data-element="test-wrapper">
        <div class="test-section stack" data-element="test-section">
          <div class="uppercase clickable" data-element="clickable" data-example="title" data-font="primary" data-size="2.5" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a title</div>
          <hr/>
          <div><em class="secondary clickable" data-element="clickable" data-example="lede" data-font="secondary" data-size="1.125" data-leading="lineMax" data-weight="normal" data-fontFamily="">A lede serves as the introductory sentence or paragraph of an article, capturing the reader's attention by summarizing the most essential information, setting the tone, and encouraging further reading.</em></div>
          <div class="cluster secondary">
            <div class="clickable" data-element="clickable" data-example="byline" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">A. N. Author</div>
            <div class="clickable" data-element="clickable" data-example="byline" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">20th December 2025</div>
          </div>
        </div>
      </div>
      <div class="grid-s-l columns-1-3" data-element="test-wrapper">
        <div class="test-section stack stack-m" data-element="test-section">
          <div class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">A paragraph is a distinct section of writing focused on a single idea, beginning with a topic sentence and followed by supporting sentences that develop the idea with details and evidence. It ensures coherence and clarity, enhancing readability by breaking down information into manageable segments. Effective paragraphs help writers maintain focus and coherence, contributing to a clearer and more engaging piece of writing.</div>
          <div class="test-heading clickable" data-element="clickable" data-example="heading" data-font="primary" data-size="1.6" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a heading</div>
          <div class="clickable clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">A second paragraph introduces a new but related idea, providing further depth and context. It expands the discussion with additional evidence or explores different facets of the topic, maintaining the reader's interest. Serving as a bridge from the introduction to the body, it ensures a logical flow and reinforces the overall coherence and structure of the writing.</div>
          <div class="test-subheading uppercase clickable" data-element="clickable" data-example="subheading" data-font="primary" data-size="1.125" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a subheading</div>
          <div class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">Using lists in writing offers several benefits:</div>
          <ul class="test-list">
            <li class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Clarity</strong>: Lists make information easier to read and understand.</li>
            <li class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Organization</strong>: They help structure content, highlighting key points.</li>
            <li class="clickable" data-element="clickable" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Emphasis</strong>: Lists draw attention to important details and steps.</li>
          </ul>
        </div>
        <div class="test-sidebar stack stack-xl" data-element="test-sidebar">
          <div class="stack" data-element="test-blockquote">
            <div class="test-quote clickable" data-element="clickable" data-example="quote" data-font="primary" data-size="1.125" data-leading="lineMin" data-weight="normal" data-fontFamily="">Blockquotes are a powerful way to highlight key points or notable quotes, drawing the reader's attention with a distinctive format.</div>
            <hr/>
            <div class="test-citation secondary uppercase clickable" data-element="clickable" data-example="citation" data-font="secondary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">A. N. Author</div>
          </div>
          <aside class="test-form stack stack-m" data-element="test-form">
            <div class="uppercase clickable" data-element="clickable" data-example="subheading" data-font="secondary" data-size="1" data-leading="lineMin" data-weight="bold">This is a form</div>
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

  function updateTestScreen() {

    console.log("Update Test Screen Triggered!");

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    const primaryExamples = test.querySelectorAll('[data-font="primary"');
    const secondaryExamples = test.querySelectorAll('[data-font="secondary"');

    processExamples(primaryExamples, primaryFont);
    processExamples(secondaryExamples, secondaryFont);

    function processExamples(examples, font) {
      examples.forEach((example) => {
        if(example.dataset.fontFamily !== font.label) {
          updateFont(example, font);
        }
      });
    }
  }

  store.subscribe(updateTestScreen);

  const examples = test.querySelectorAll('[data-element="clickable"');
  examples.forEach(example => {
    example.addEventListener('mouseenter', handleMouseEnter);
    example.addEventListener('mouseleave', handleMouseLeave);
    example.addEventListener('click', handleClick);
  });

  function handleMouseEnter(e) {
    const element = e.target;
    const type = element.dataset.example;
    const matches = test.querySelectorAll(`[data-example="${type}"]`);
    matches.forEach((match) => {
      match.classList.add("test-highlighted");
    });
  }

  function handleMouseLeave(e) {
    const element = e.target;
    const type = element.dataset.example;
    const matches = test.querySelectorAll(`[data-example="${type}"]`);
    matches.forEach((match) => {
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

    const matches = test.querySelectorAll(`[data-example="${type}"]`);

    matches.forEach((match) => {
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

  return test;

}

export default Test;