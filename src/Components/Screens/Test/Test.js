import setFontStyles from "../../../utils/setFontStyles";

function Test(store) {

  const test = document.createElement('div');
  
  /* html */
  test.innerHTML = `
    <div class="stack-xl">
      <div class="stack">
        <div class="test-title test-example" data-element="test-example" data-example="title" data-font="primary" data-size="2" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a title</div>
        <hr/>
        <div class="test-lede test-example" data-element="test-example" data-example="lede" data-font="secondary" data-size="1.125" data-leading="lineMax" data-weight="normal" data-fontFamily="">A lede serves as the introductory sentence or paragraph of an article, capturing the reader's attention by summarizing the most essential information, setting the tone, and encouraging further reading.</div>
        <div class="test-byline">
          <div class="test-example" data-element="test-example" data-example="byline" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">A. N. Author</div>
          <div class="test-example" data-element="test-example" data-example="byline" data-font="primary" data-size="0.8875" data-leading="lineMin" data-weight="bold" data-fontFamily="">20th December 2025</div>
        </div>
      </div>
      <div class="test-example" data-element="test-example" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">A paragraph is a distinct section of writing focused on a single idea, beginning with a topic sentence and followed by supporting sentences that develop the idea with details and evidence. It ensures coherence and clarity, enhancing readability by breaking down information into manageable segments. Effective paragraphs help writers maintain focus and coherence, contributing to a clearer and more engaging piece of writing.</div>
      <div class="test-heading test-example" data-element="test-example" data-example="heading" data-font="primary" data-size="1.6" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a heading</div>
      <div class="test-example test-example" data-element="test-example" data-example="paragraph" data-font="secondary" data-size="lineMin" data-leading="lineMax" data-weight="normal" data-fontFamily="">A second paragraph introduces a new but related idea, providing further depth and context. It expands the discussion with additional evidence or explores different facets of the topic, maintaining the reader's interest. Serving as a bridge from the introduction to the body, it ensures a logical flow and reinforces the overall coherence and structure of the writing.</div>
      <div class="test-subheading test-example" data-element="test-example" data-example="subheading" data-font="primary" data-size="1.125" data-leading="lineMin" data-weight="bold" data-fontFamily="">This is a subheading</div>
      <div class="test-example" data-element="test-example" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily="">Using lists in writing offers several benefits:</div>
      <ul class="test-list">
        <li class="test-example " data-element="test-example" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Clarity</strong>: Lists make information easier to read and understand.</li>
        <li class="test-example" data-element="test-example" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Organization</strong>: They help structure content, highlighting key points.</li>
        <li class="test-example" data-element="test-example" data-example="paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="normal" data-fontFamily=""><strong>Emphasis</strong>: Lists draw attention to important details and steps.</li>
      </ul>
    </div>
  `;

  function updateTestScreen() {

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

  const examples = test.querySelectorAll('[data-element="test-example"');
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

    console.log(font, fontType, matches);

    matches.forEach((match) => {
      match.classList.remove("test-highlighted");
      match.dataset.font = fontType;
      updateFont(match, font);
    });

  }

  function updateFont(example, font) {
    setFontStyles({
      element: example, 
      font: font, 
      size: example.dataset.size, 
      weight: example.dataset.weight,
      leading: font[example.dataset.leading]
    });
    example.dataset.fontFamily = font.label;
  }

  store.subscribe(updateTestScreen);

  return test;

}

export default Test;