import styles from "./AppHeader.module.css";

function AppHeader(showNav) {

  const appHeader = document.createElement('div');
  appHeader.className = styles.header;

  /* html */
  appHeader.innerHTML = `
    <h1 class="wrap insulate ${styles.heading}">
      <span class="sr-only">xHeightable</span>
      <svg width="82" height="16" viewBox="0 0 82 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M81.465 9.58003L81.9972 10.9272C81.0825 11.7588 79.9182 12.2411 78.6708 12.2411C76.3423 12.2411 74.6459 10.5447 74.6459 8.34926C74.6459 6.15383 76.359 4.44073 78.6043 4.44073C80.1677 4.44073 81.4317 5.2557 81.9806 6.73595L76.9577 10.2453C77.3902 10.6445 77.9889 10.8773 78.6875 10.8773C79.6521 10.8773 80.5835 10.4782 81.465 9.58003ZM78.6043 5.78793C77.2238 5.78793 76.1594 6.91891 76.1594 8.34926C76.1594 8.61537 76.1927 8.86485 76.2592 9.0977L80.1344 6.40331C79.7685 6.00414 79.2197 5.78793 78.6043 5.78793Z" fill="#DBDBDC"/>
        <path d="M71.6997 12.0582V0.24948L73.3795 0V12.0582H71.6997Z" fill="#DBDBDC"/>
        <path d="M66.5885 4.44075C68.7174 4.44075 70.4138 6.10395 70.4138 8.316C70.4138 10.578 68.6508 12.2412 66.339 12.2412C64.0604 12.2412 62.3473 10.6445 62.3473 8.26611V0.24948L64.0438 0V5.53846C64.6591 4.85655 65.5406 4.44075 66.5885 4.44075ZM66.3556 10.7609C67.7194 10.7609 68.7672 9.72973 68.7672 8.33264C68.7672 6.96881 67.7527 5.921 66.4055 5.921C65.0417 5.921 63.9939 6.96881 63.9939 8.3659C63.9939 9.71309 64.9918 10.7609 66.3556 10.7609Z" fill="#DBDBDC"/>
        <path d="M59.2361 4.72348L60.8661 4.474V12.0582H59.286V11.027C58.6707 11.7755 57.7725 12.2411 56.6914 12.2411C54.6124 12.2411 52.9326 10.5281 52.9326 8.34926C52.9326 6.15383 54.6124 4.44073 56.6748 4.44073C57.7393 4.44073 58.6208 4.8898 59.2361 5.60498V4.72348ZM56.9243 10.7775C58.2382 10.7775 59.286 9.71308 59.286 8.33263C59.286 6.9688 58.2382 5.90435 56.9243 5.90435C55.6104 5.90435 54.5792 6.9688 54.5792 8.33263C54.5792 9.71308 55.6104 10.7775 56.9243 10.7775Z" fill="#DBDBDC"/>
        <path d="M52.386 6.05406H50.3402V9.59668C50.3402 10.2952 50.7228 10.6944 51.3714 10.6944C51.7207 10.6944 52.1365 10.578 52.386 10.4782V11.9418C52.0866 12.0748 51.5876 12.1913 51.0554 12.1913C49.5419 12.1913 48.6604 11.2765 48.6604 9.763V6.05406H47.5294L47.7789 4.62371H48.6604V3.1102L50.3402 2.19543V4.62371H52.386V6.05406Z" fill="#DBDBDC"/>
        <path d="M43.9174 4.44075C45.6138 4.44075 46.7614 5.60499 46.7614 7.5343V12.0582H45.0816V7.73388C45.0816 6.56964 44.4163 5.93763 43.4517 5.93763C42.4039 5.93763 41.6554 6.68607 41.6554 7.85031V12.0582H39.9756V0.24948L41.6554 0V5.47193C42.1876 4.80665 42.9693 4.44075 43.9174 4.44075Z" fill="#DBDBDC"/>
        <path d="M38.7216 4.25781L38.4888 5.605L37.3246 5.52184C37.9399 6.0707 38.3225 6.85241 38.3225 7.75053C38.3225 8.89814 37.7237 9.87943 36.7757 10.4449C37.5907 10.9771 38.1063 11.842 38.1063 12.8898C38.1063 14.5863 36.7591 16 34.7632 16C33.1167 16 31.8693 15.0021 31.5366 13.5218L32.8505 12.8233C33.0169 13.9044 33.732 14.6029 34.7632 14.6029C35.8443 14.6029 36.5927 13.8378 36.5927 12.8566C36.5927 11.842 35.811 11.0936 34.7466 11.0936C34.0148 11.0936 33.4659 11.4595 33.0501 11.9584L32.4846 10.7942C32.6011 10.6944 32.7175 10.5946 32.8339 10.5114C31.8526 9.94596 31.204 8.94804 31.204 7.7339C31.204 5.98754 32.5678 4.50729 34.8464 4.4075L38.7216 4.25781ZM34.7632 5.82122C33.6323 5.82122 32.7674 6.66945 32.7674 7.76717C32.7674 8.86488 33.6323 9.69648 34.7632 9.69648C35.9108 9.69648 36.7757 8.86488 36.7757 7.76717C36.7757 6.66945 35.9108 5.82122 34.7632 5.82122Z" fill="#DBDBDC"/>
        <path d="M29.0561 2.94384C28.4407 2.94384 27.9584 2.47814 27.9584 1.87939C27.9584 1.28064 28.4407 0.814941 29.0561 0.814941C29.6715 0.814941 30.1538 1.28064 30.1538 1.87939C30.1538 2.47814 29.6715 2.94384 29.0561 2.94384ZM28.2245 12.0582V4.75673L29.9043 4.49062V12.0582H28.2245Z" fill="#DBDBDC"/>
        <path d="M26.3838 9.58003L26.916 10.9272C26.0013 11.7588 24.837 12.2411 23.5896 12.2411C21.2612 12.2411 19.5647 10.5447 19.5647 8.34926C19.5647 6.15383 21.2778 4.44073 23.5231 4.44073C25.0865 4.44073 26.3506 5.2557 26.8994 6.73595L21.8765 10.2453C22.309 10.6445 22.9077 10.8773 23.6063 10.8773C24.5709 10.8773 25.5023 10.4782 26.3838 9.58003ZM23.5231 5.78793C22.1427 5.78793 21.0782 6.91891 21.0782 8.34926C21.0782 8.61537 21.1115 8.86485 21.178 9.0977L25.0533 6.40331C24.6874 6.00414 24.1385 5.78793 23.5231 5.78793Z" fill="#DBDBDC"/>
        <path d="M16.3849 0.548888L18.1645 0.282776V12.0582H16.3849V6.98548H10.231V12.0582H8.45142V0.548888L10.231 0.282776V5.28901H16.3849V0.548888Z" fill="#DBDBDC"/>
        <path d="M7.28482 12.0582H5.37214L3.52599 9.29731L2.5447 8.18297L0 4.62372H1.89605L3.52599 7.08526L4.52391 8.18297L7.28482 12.0582Z" fill="#DBDBDC"/>
        <path d="M5.42013 4.62372C5.43167 4.75252 5.45943 4.8783 5.49434 4.99493C5.52199 5.08733 5.52991 5.14907 5.53076 5.18582C5.49538 5.1958 5.43403 5.20634 5.33758 5.20702C4.97781 5.20954 4.55987 5.29522 4.30412 5.64125C4.04837 5.98728 4.08911 6.41196 4.19227 6.75664C4.21993 6.84904 4.22785 6.91079 4.22869 6.94753C4.19332 6.95751 4.13196 6.96805 4.03552 6.96873C3.67574 6.97126 3.2578 7.05693 3.00205 7.40296C2.7463 7.74899 2.78704 8.17368 2.89021 8.51835C2.91786 8.61075 2.92578 8.6725 2.92663 8.70925C2.89125 8.71922 2.8299 8.72977 2.73345 8.73044C2.37367 8.73297 1.95573 8.81864 1.69998 9.16468C1.44424 9.51071 1.48498 9.93539 1.58814 10.2801C1.61579 10.3725 1.62372 10.4342 1.62456 10.471C1.58919 10.4809 1.52783 10.4915 1.43139 10.4922C1.07161 10.4947 0.653669 10.5804 0.397919 10.9264C0.14217 11.2724 0.182912 11.6971 0.286074 12.0418L0.290884 12.0582H1.35001C1.33626 11.9493 1.31169 11.8432 1.28193 11.7437C1.25427 11.6513 1.24635 11.5896 1.24551 11.5528C1.28088 11.5429 1.34223 11.5323 1.43868 11.5316C1.79846 11.5291 2.2164 11.4434 2.47215 11.0974C2.7279 10.7514 2.68715 10.3267 2.58399 9.98201C2.55634 9.88961 2.54841 9.82786 2.54757 9.79112C2.58295 9.78114 2.6443 9.7706 2.74075 9.76992C3.10052 9.76739 3.51846 9.68172 3.77421 9.33569C4.02996 8.98966 3.98922 8.56498 3.88606 8.2203C3.8584 8.1279 3.85048 8.06615 3.84964 8.02941C3.88501 8.01943 3.94637 8.00888 4.04281 8.00821C4.40259 8.00568 4.82053 7.92001 5.07628 7.57398C5.33203 7.22794 5.29129 6.80326 5.18812 6.45858C5.16047 6.36618 5.15255 6.30444 5.1517 6.26769C5.18708 6.25771 5.24843 6.24717 5.34488 6.24649C5.70466 6.24397 6.1226 6.15829 6.37834 5.81226C6.63409 5.46623 6.59335 5.04155 6.49019 4.69687C6.48213 4.66993 6.47574 4.64559 6.47072 4.62372H5.42013Z" fill="#B87333"/>
      </svg>
    </h1>
  `;

  return appHeader;

}

export default AppHeader;