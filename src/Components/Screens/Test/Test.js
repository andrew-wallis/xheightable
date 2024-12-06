import setFontStyles from "../../../utils/setFontStyles";
import AppHeader from "../../Global/AppHeader/AppHeader";
import NavBar from "../../Global/NavBar/NavBar";
import styles from "./Test.module.css";

function Test(store) {

  const test = document.createElement('div');
  test.id = "test";
  test.className = "screen";
  test.style.display = "none";
  test.dataset.screen = "Test";
  test.dataset.element = "screen";
  
  /* html */
  test.innerHTML = `
    <header data-element="pair-header">
      <div class="header-container">
        <div class="wrap insulate stack" data-element="top-bar">
          <!-- Table Topbar -->
        </div>
      </div>
    </header>
    <main class="wrap insulate stack">
      <h1 data-element="title" class=${styles.title}>Font Trends in 2024</h1>
      <p data-element="lede" class=${styles.lede}>2024 sees fonts as dynamic tools, shaping design trends and reflecting digital evolution.</p>
      <ul data-element="small" class=${styles.small}>
        <li>Emily Jones</li>
        <li>4 April 2024</li>
      </ul>
      <p data-element="paragraph" class=${styles.paragraph}>Typography has always been a crucial element in design, influencing how  information is perceived and communicated. In recent years, we've witnessed significant shifts in font preferences, driven by advancements in technology and changing design philosophies. As we navigate through 2024, the world of fonts is embracing innovation and experimentation like never before. Let's explore the prominent font trends defining this year.</p>
      <div class=${styles.image}></div>
      <div data-element="caption" class=${styles.caption}><span class="opacity-80">Photo by</span> Brands&People <span class="opacity-80">on</span> Unsplash</div>
      <h2 data-element="heading" class=${styles.heading}>Minimalist Fonts</h2>
      <p data-element="paragraph" class=${styles.paragraph}>In 2024, the mantra "less is more" echoes throughout the design realm, manifesting in the prevalence of minimalist fonts. Embracing simplicity, these typefaces exude elegance and clarity, offering a timeless appeal across various platforms. With clean lines and ample white space, minimalist fonts enhance readability while maintaining a sense of sophistication. From sleek sans-serifs to refined serifs, designers are harnessing the power of simplicity to create visually striking compositions that resonate with modern audiences.</p>
      <blockquote class=${styles.quote} data-element="quote">“In a world cluttered with information, minimalist fonts offer a breath of fresh air, allowing content to shine with clarity and elegance.”</blockquote>
      <p data-element="paragraph" class=${styles.paragraph}>The rise of minimalist fonts can be attributed to their versatility and adaptability across different mediums. Whether adorning a sleek website interface or gracing the pages of a printed publication, these fonts seamlessly integrate with diverse design elements, fostering a harmonious visual experience. By prioritizing legibility and aesthetic refinement  minimalist fonts empower brands to communicate their message effectively while leaving a lasting impression on their audience.</p>
      <p data-element="paragraph" class=${styles.paragraph}>As we navigate the digital age, minimalist fonts serve as a beacon of simplicity in a sea of complexity, guiding us towards a more refined and visually engaging future.</p>
      <h2 data-element="heading" class=${styles.heading}>Variable Fonts</h2>
      <p data-element="paragraph" class=${styles.paragraph}>Enter the era of dynamic typography with the advent of variable fonts, revolutionizing the way we perceive and utilize typefaces. Offering unprecedented flexibility, variable fonts encapsulate a spectrum of styles within a single font file, allowing designers to tailor typography with precision and fluidity. From adjusting weight and width to fine-tuning optical size, the possibilities are limitless, enabling seamless adaptation across various screen sizes and devices.</p>
      <blockquote class=${styles.quote} data-element="quote">“Variable fonts usher in a new era of typographic versatility, empowering designers to craft dynamic compositions with unparalleled precision and fluidity.”</blockquote>
      <p data-element="paragraph" class=${styles.paragraph}>With the growing demand for responsive design, variable fonts emerge as a game-changer, streamlining the optimization process without compromising visual integrity. By eliminating the need for multiple font files, these adaptable typefaces enhance performance and accessibility, ensuring a consistent user experience across diverse digital platforms. From enhancing readability on mobile devices to optimizing loading times on web pages, variable fonts pave the way for a more accessible and inclusive digital landscape.</p>
      <p data-element="paragraph" class=${styles.paragraph}>As technology continues to evolve, variable fonts stand at the forefront of typographic innovation, reshaping the way we interact with content in the digital sphere.</p>
      <h2 data-element="heading" class=${styles.heading}>Experimental Typography</h2>
      <p data-element="paragraph" class=${styles.paragraph}>In the avant-garde realm of design, experimental typography reigns supreme, pushing the boundaries of conventional aesthetics and challenging the status quo. Embracing bold forms, vibrant colors, and unconventional layouts, experimental typography captivates the imagination, sparking dialogue and evoking emotion. From typographic illusions to kinetic typography, designers are harnessing the power of experimentation to create immersive experiences that captivate and inspire.</p>
      <blockquote class=${styles.quote} data-element="quote" >“Experimental typography defies expectations, inviting audiences on a journey of visual exploration and discovery, where creativity knows no bounds.”</blockquote>
      <p data-element="paragraph" class=${styles.paragraph}>Fuelled by innovation and artistic expression, experimental typography transcends traditional constraints, blurring the lines between art and design. By embracing risk-taking and pushing the limits of typographic expression, designers breathe life into static content, transforming words into dynamic visual narratives that resonate with audiences on a deeper level. From interactive installations to multimedia presentations, experimental typography offers a glimpse into the boundless possibilities of creative expression in the digital age.</p>
      <p data-element="paragraph" class=${styles.paragraph}>As we embrace the spirit of experimentation, experimental typography serves as a catalyst for innovation, paving the way for new forms of visual storytelling and creative expression.</p>
      <p data-element="paragraph" class=${styles.paragraph}>In the dynamic landscape of design, fonts serve as the cornerstone of visual communication, shaping the way we perceive and interact with content. As we traverse the typography trends of 2024, from the elegant simplicity of minimalist fonts to the dynamic versatility of variable fonts and the daring experimentation of avant-garde typography, one thing remains clear: the power of typography to captivate, inspire, and evoke emotion knows no bounds. As we embark on this typographic journey, let us embrace the endless possibilities of creative expression, forging a path towards a more vibrant and visually engaging future.</p>
    </main>
  `;

  const topBar = test.querySelector('[data-element="top-bar"]');
  topBar.appendChild(AppHeader());
  topBar.appendChild(NavBar());

  function updateTestScreen() {
    
    const primary = store.getData().primaryFont;
    const secondary = store.getData().secondaryFont;

    if(test.dataset.primary !== primary.label || test.dataset.secondary !== secondary.label) {

      test.dataset.primary = primary.label;
      test.dataset.secondary = secondary.label

      const titles = test.querySelectorAll('[data-element="title"]');
      titles.forEach((title) => {
        setFontStyles({element: title, font: primary, size: 2.25, leading: 2.25});
      });

      const headings = test.querySelectorAll('[data-element="heading"]');
      headings.forEach((heading) => {
        setFontStyles({element: heading, font: primary, size: 1.5, leading: 1.75});
      });

      const ledes = test.querySelectorAll('[data-element="lede"]');
      ledes.forEach((lede) => {
        setFontStyles({element: lede, font: secondary, size: 1.125, leading: 1.7});
      });

      const paragraphs = test.querySelectorAll('[data-element="paragraph"]');
      paragraphs.forEach((paragraph) => {
        setFontStyles({element: paragraph, font: secondary, size: 1, leading: 1.5});
      });

      const smalls = test.querySelectorAll('[data-element="small"]');
      smalls.forEach((small) => {
        setFontStyles({element: small, font: primary, size: 0.875, leading: 1});
      });

      const quotes = test.querySelectorAll('[data-element="quote"]');
      quotes.forEach((quote) => {
        setFontStyles({element: quote, font: secondary, size: 1.125, leading: 1.7});
      });

      const captions = test.querySelectorAll('[data-element="caption"]');
      captions.forEach((caption) => {
        setFontStyles({element: caption, font: primary, size: 0.75, leading: 0.875});
      });
        
    }
  }

  store.subscribe(updateTestScreen);

  return test;

}

export default Test;