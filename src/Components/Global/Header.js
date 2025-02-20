function Header(front) {

  const header = document.createElement('header');

  if(front) header.role = "banner";

  /* html */
  header.innerHTML = `
    <div class="wrap with-sidebar">
      <div class="not-sidebar logo accent" data-element="branding">
        <h1 class="sr-only">x-heightable</h1>
        <svg width="670" height="128" viewBox="0 0 670 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M639.779 84.7904C647.899 84.7904 655.739 81.4304 663.019 73.8704L667.639 85.2104C659.939 92.2104 650.139 96.2704 639.639 96.2704C620.039 96.2704 605.759 81.9904 605.759 63.5104C605.759 45.0304 620.178 30.6104 639.078 30.6104C654.898 30.6104 667.498 40.9704 669.458 58.3304L621.018 74.0104C624.378 80.4504 630.958 84.7904 639.779 84.7904ZM639.078 41.9504C627.738 41.9504 619.059 51.0504 618.639 62.9504L654.619 51.1904C651.959 45.4504 646.078 41.9504 639.078 41.9504Z" fill="currentColor"/>
          <path d="M582.359 94.7305V11.3305L596.499 9.23047V94.7305H582.359Z" fill="currentColor"/>
          <path d="M540.735 30.6105C558.655 30.6105 572.935 44.6105 572.935 63.2305C572.935 82.2705 558.095 96.2705 538.635 96.2705C519.455 96.2705 505.035 82.8305 505.035 62.8105V11.3305L519.315 9.23047V39.8505C524.495 34.1105 531.915 30.6105 540.735 30.6105ZM538.775 83.8105C550.255 83.8105 559.075 75.1305 559.075 63.3705C559.075 51.8905 550.535 43.0705 539.195 43.0705C527.715 43.0705 518.895 51.8905 518.895 63.6505C518.895 74.9905 527.295 83.8105 538.775 83.8105Z" fill="currentColor"/>
          <path d="M495.817 94.7301H483.077L482.657 90.5301C478.457 94.1701 472.997 96.2701 466.837 96.2701C453.677 96.2701 443.457 86.4701 443.457 73.7301C443.457 60.9901 453.537 51.1901 467.117 51.1901C472.997 51.1901 477.897 53.2901 481.817 56.3701V53.1501C481.817 45.5901 478.317 41.6701 468.237 41.6701C462.917 41.6701 458.017 42.7901 453.117 44.4701L455.077 33.1301C460.257 31.5901 465.157 30.8901 470.197 30.8901C486.577 30.8901 495.257 38.3101 495.257 52.1701V82.9701L495.817 94.7301ZM469.637 85.6301C476.917 85.6301 482.517 80.3101 482.517 73.5901C482.517 66.7301 476.777 61.4101 469.637 61.4101C462.497 61.4101 456.897 66.7301 456.897 73.5901C456.897 80.4501 462.497 85.6301 469.637 85.6301Z" fill="currentColor"/>
          <path d="M439.709 44.19H422.489V74.01C422.489 79.89 425.709 83.25 431.169 83.25C434.109 83.25 437.609 82.27 439.709 81.43V93.75C437.189 94.87 432.989 95.85 428.509 95.85C415.769 95.85 408.349 88.15 408.349 75.41V44.19H398.829L400.929 32.15H408.349V17.41L422.489 9.70996V32.15H439.709V44.19Z" fill="currentColor"/>
          <path d="M369.824 30.6105C384.104 30.6105 393.764 40.4105 393.764 56.6505V94.7305H379.624V58.3305C379.624 48.5305 374.024 43.2105 365.904 43.2105C357.084 43.2105 350.784 49.5105 350.784 59.3105V94.7305H336.644V11.3305L350.784 9.23047V39.2905C355.264 33.6905 361.844 30.6105 369.824 30.6105Z" fill="currentColor"/>
          <path d="M309.332 33.2704L323.052 31.0304V93.7504C323.052 113.91 309.752 127.91 289.032 127.91C278.112 127.91 268.452 124.27 259.772 117.13L263.412 105.09C271.392 112.37 279.512 115.73 288.332 115.73C302.052 115.73 309.332 106.63 309.332 93.3304V85.7704C304.152 91.9304 296.732 95.5704 287.912 95.5704C270.552 95.5704 256.272 81.2904 256.272 63.0904C256.272 44.8904 270.552 30.6104 287.912 30.6104C296.732 30.6104 304.152 34.2504 309.332 40.2704V33.2704ZM290.012 83.2504C301.072 83.2504 309.752 74.4304 309.752 63.0904C309.752 51.8904 301.072 42.9304 290.012 42.9304C278.812 42.9304 270.132 51.8904 270.132 63.0904C270.132 74.4304 278.812 83.2504 290.012 83.2504Z" fill="currentColor"/>
          <path d="M239.873 18.0103C234.693 18.0103 230.633 14.0903 230.633 9.05033C230.633 4.01034 234.693 0.090332 239.873 0.090332C245.053 0.090332 249.113 4.01034 249.113 9.05033C249.113 14.0903 245.053 18.0103 239.873 18.0103ZM232.873 94.7303V33.2703L247.013 31.0303V94.7303H232.873Z" fill="currentColor"/>
          <path d="M193.758 84.7904C201.878 84.7904 209.718 81.4304 216.998 73.8704L221.618 85.2104C213.918 92.2104 204.118 96.2704 193.618 96.2704C174.018 96.2704 159.738 81.9904 159.738 63.5104C159.738 45.0304 174.158 30.6104 193.058 30.6104C208.878 30.6104 221.478 40.9704 223.438 58.3304L174.998 74.0104C178.358 80.4504 184.938 84.7904 193.758 84.7904ZM193.058 41.9504C181.718 41.9504 173.038 51.0504 172.618 62.9504L208.598 51.1904C205.938 45.4504 200.058 41.9504 193.058 41.9504Z" fill="currentColor"/>
          <path d="M127.809 30.6105C142.089 30.6105 151.749 40.4105 151.749 56.6505V94.7305H137.609V58.3305C137.609 48.5305 132.009 43.2105 123.889 43.2105C115.069 43.2105 108.769 49.5105 108.769 59.3105V94.7305H94.6294V11.3305L108.769 9.23047V39.2905C113.249 33.6905 119.829 30.6105 127.809 30.6105Z" fill="currentColor"/>
          <path d="M63.28 67.9902L65.2477 55.9502H84.0447L82.0771 67.9902H63.28Z" fill="currentColor"/>
          <path d="M63.28 94.7304H47.18L31.64 71.4904L16.24 94.7304H0L23.38 62.1104L1.96 32.1504H17.92L31.64 52.8704L45.5 32.1504H61.32L40.04 62.1104L63.28 94.7304Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="sidebar">
        <a aria-label="Visit Blah (Opens in a new tab)" rel="noopener noreferrer" class="double-accent" href="https://www.blah.com" target="_blank"><strong>Buy us a coffee!</strong></a>
      </div>
    </div>
  `;
  return header;

}

export default Header;