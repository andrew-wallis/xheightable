function Header() {

  const header = document.createElement('header');

  /* html */
  header.innerHTML = `
    <div class="wrap with-sidebar">
      <div class="logo">
        <span class="sr-only">xHeightable</span>
        <svg width="90" height="16" viewBox="0 0 90 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M85.3306 10.3737C86.3901 10.3737 87.4131 9.93531 88.3629 8.94888L88.9658 10.4285C87.9611 11.3419 86.6824 11.8716 85.3123 11.8716C82.7549 11.8716 80.8917 10.0084 80.8917 7.59711C80.8917 5.18584 82.7732 3.30432 85.2393 3.30432C87.3034 3.30432 88.9475 4.65609 89.2032 6.92122L82.8828 8.96715C83.3212 9.80744 84.1798 10.3737 85.3306 10.3737ZM85.2393 4.78396C83.7596 4.78396 82.6271 5.97133 82.5722 7.52404L87.2669 5.9896C86.9198 5.24064 86.1526 4.78396 85.2393 4.78396Z" fill="currentColor"/>
          <path d="M77.6558 11.6706V0.274007L79.5007 0V11.6706H77.6558Z" fill="currentColor"/>
          <path d="M72.042 3.30428C74.3802 3.30428 76.2434 5.131 76.2434 7.56053C76.2434 10.0449 74.3071 11.8716 71.768 11.8716C69.2654 11.8716 67.3839 10.1179 67.3839 7.50573V0.274007L69.2471 0V4.50991C69.923 3.76096 70.8911 3.30428 72.042 3.30428ZM71.7862 10.2458C73.2841 10.2458 74.435 9.11324 74.435 7.5788C74.435 6.08089 73.3207 4.93006 71.841 4.93006C70.3431 4.93006 69.1923 6.08089 69.1923 7.61533C69.1923 9.09498 70.2883 10.2458 71.7862 10.2458Z" fill="currentColor"/>
          <path d="M65.9984 11.6707H64.3361L64.2812 11.1226C63.7332 11.5976 63.0208 11.8716 62.2171 11.8716C60.4999 11.8716 59.1664 10.5929 59.1664 8.93058C59.1664 7.26826 60.4817 5.98956 62.2536 5.98956C63.0208 5.98956 63.6602 6.26357 64.1717 6.66545V6.2453C64.1717 5.25887 63.715 4.74739 62.3997 4.74739C61.7056 4.74739 61.0662 4.89353 60.4269 5.11274L60.6826 3.6331C61.3585 3.43216 61.9979 3.34082 62.6555 3.34082C64.7927 3.34082 65.9253 4.30898 65.9253 6.11743V10.1362L65.9984 11.6707ZM62.5824 10.4833C63.5323 10.4833 64.263 9.78913 64.263 8.91231C64.263 8.01722 63.514 7.32307 62.5824 7.32307C61.6508 7.32307 60.9201 8.01722 60.9201 8.91231C60.9201 9.8074 61.6508 10.4833 62.5824 10.4833Z" fill="currentColor"/>
          <path d="M58.4946 5.07624H56.2477V8.96715C56.2477 9.73437 56.6679 10.1728 57.3803 10.1728C57.7639 10.1728 58.2206 10.0449 58.4946 9.93531V11.5428C58.1658 11.689 57.6178 11.8168 57.0332 11.8168C55.3709 11.8168 54.4028 10.8121 54.4028 9.14982V5.07624H53.1606L53.4346 3.50526H54.4028V1.84295L56.2477 0.838257V3.50526H58.4946V5.07624Z" fill="currentColor"/>
          <path d="M49.1933 3.30433C51.0566 3.30433 52.317 4.58304 52.317 6.70203V11.6707H50.472V6.92123C50.472 5.64253 49.7414 4.94838 48.6819 4.94838C47.531 4.94838 46.709 5.7704 46.709 7.0491V11.6707H44.864L44.864 0.274007L46.709 0L46.709 4.4369C47.2936 3.70621 48.1521 3.30433 49.1933 3.30433Z" fill="currentColor"/>
          <path d="M41.1175 3.6514L42.9077 3.35912V11.5428C42.9077 14.1733 41.1723 16 38.4687 16C37.0439 16 35.7835 15.5251 34.6509 14.5934L35.1258 13.0225C36.1671 13.9724 37.2266 14.4108 38.3774 14.4108C40.1676 14.4108 41.1175 13.2234 41.1175 11.488V10.5016C40.4416 11.3053 39.4734 11.7803 38.3226 11.7803C36.0575 11.7803 34.1942 9.91704 34.1942 7.54231C34.1942 5.16757 36.0575 3.30432 38.3226 3.30432C39.4734 3.30432 40.4416 3.77927 41.1175 4.56476V3.6514ZM38.5966 10.1728C40.0397 10.1728 41.1723 9.02195 41.1723 7.54231C41.1723 6.08093 40.0397 4.91183 38.5966 4.91183C37.1352 4.91183 36.0027 6.08093 36.0027 7.54231C36.0027 9.02195 37.1352 10.1728 38.5966 10.1728Z" fill="currentColor"/>
          <path d="M30.9584 11.6707V3.65141L32.8034 3.35913V11.6707H30.9584Z" fill="currentColor"/>
          <path d="M30.6661 1.1691C30.6661 1.82672 31.1959 2.3382 31.8718 2.3382C32.5477 2.3382 33.0774 1.82672 33.0774 1.1691C33.0774 0.511482 32.5477 0 31.8718 0C31.1959 0 30.6661 0.511482 30.6661 1.1691Z" fill="currentColor"/>
          <path d="M25.672 10.3737C26.7315 10.3737 27.7545 9.93531 28.7044 8.94888L29.3072 10.4285C28.3025 11.3419 27.0238 11.8716 25.6538 11.8716C23.0963 11.8716 21.2331 10.0084 21.2331 7.59711C21.2331 5.18584 23.1146 3.30432 25.5807 3.30432C27.6449 3.30432 29.2889 4.65609 29.5447 6.92122L23.2242 8.96715C23.6626 9.80744 24.5212 10.3737 25.672 10.3737ZM25.5807 4.78396C24.101 4.78396 22.9685 5.97133 22.9137 7.52404L27.6083 5.9896C27.2613 5.24064 26.494 4.78396 25.5807 4.78396Z" fill="currentColor"/>
          <path d="M16.8843 3.30438C18.7476 3.30438 20.008 4.58308 20.008 6.70208V11.6707H18.163V6.92128C18.163 5.64258 17.4323 4.94843 16.3728 4.94843C15.222 4.94843 14.4 5.77045 14.4 7.04915V11.6707H12.555V0.274129L14.4 0.00012207V4.43695C14.9845 3.70626 15.8431 3.30438 16.8843 3.30438Z" fill="currentColor"/>
          <path d="M7.98822 8.16944L8.16199 6.59644H11.0199L10.8462 8.16944H7.98822Z" fill="currentColor"/>
          <path d="M8.00243 11.6707H5.9017L3.87405 8.63833L2.79627 7.41443L0.00140381 3.50525H2.08386L3.87405 6.20879L4.97008 7.41443L8.00243 11.6707Z" fill="currentColor"/>
          <path d="M6.16982 3.37305C6.18288 3.51868 6.21427 3.66092 6.25374 3.79279C6.28501 3.89727 6.29397 3.96709 6.29492 4.00864C6.25492 4.01992 6.18555 4.03184 6.07649 4.03261C5.66967 4.03546 5.19709 4.13234 4.9079 4.52361C4.61872 4.91489 4.66479 5.39509 4.78144 5.78483C4.81271 5.88932 4.82167 5.95913 4.82262 6.00068C4.78262 6.01197 4.71324 6.02389 4.60419 6.02465C4.19737 6.02751 3.72479 6.12438 3.4356 6.51566C3.14642 6.90693 3.19248 7.38714 3.30913 7.77688C3.3404 7.88136 3.34936 7.95118 3.35032 7.99273C3.31032 8.00401 3.24094 8.01594 3.13188 8.0167C2.72507 8.01956 2.25249 8.11643 1.9633 8.5077C1.67411 8.89898 1.72018 9.37918 1.83683 9.76893C1.8681 9.87341 1.87706 9.94323 1.87801 9.98478C1.83801 9.99606 1.76864 10.008 1.65958 10.0087C1.25277 10.0116 0.780184 10.1085 0.490997 10.4998C0.201811 10.891 0.24788 11.3712 0.364529 11.761L0.369969 11.7796H1.56757C1.55202 11.6564 1.52424 11.5364 1.49058 11.4239C1.45931 11.3195 1.45035 11.2496 1.4494 11.2081C1.4894 11.1968 1.55878 11.1849 1.66783 11.1841C2.07465 11.1813 2.54723 11.0844 2.83642 10.6931C3.1256 10.3018 3.07954 9.82164 2.96289 9.4319C2.93162 9.32742 2.92266 9.2576 2.9217 9.21605C2.9617 9.20477 3.03108 9.19285 3.14014 9.19208C3.54695 9.18922 4.01953 9.09235 4.30872 8.70108C4.59791 8.3098 4.55184 7.8296 4.43519 7.43985C4.40392 7.33537 4.39496 7.26556 4.394 7.224C4.43401 7.21272 4.50338 7.2008 4.61244 7.20003C5.01925 7.19718 5.49183 7.1003 5.78102 6.70903C6.07021 6.31776 6.02414 5.83755 5.90749 5.44781C5.87622 5.34333 5.86726 5.27351 5.86631 5.23196C5.90631 5.22068 5.97568 5.20875 6.08474 5.20799C6.49155 5.20513 6.96414 5.10826 7.25332 4.71698C7.54251 4.32571 7.49644 3.84551 7.37979 3.45576C7.37067 3.4253 7.36345 3.39778 7.35777 3.37305H6.16982Z" fill="#59A6CD"/>
        </svg>
      </div>
      <div>
        <a class="link" href="https://www.google.com" target="_blank">Buy us a coffee!</a>
      </div>
    </div>
  `;

  return header;

}

export default Header;