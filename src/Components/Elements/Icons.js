function Icons(name) {

  const icon = document.createElement('div');
  icon.className = "icon";
  icon.dataset.icon = name;
  icon.innerHTML = getSvg();
  return icon;

  function getSvg() {
    
    switch(name) {

      case "About":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.32466 19H4.99512L10.2295 4.45456H12.765L17.9994 19H15.6698L11.5576 7.0966H11.444L7.32466 19ZM7.71529 13.304H15.2721V15.1506H7.71529V13.304Z" fill="currentColor"/></svg>`

      case "Adobe":
        return `<svg width="100%" height="100%" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 16V15.998L6.68715 0H11.4145L18.0963 15.998L18.1017 16H0ZM13.3126 15.998L9.05085 5.88543L6.12611 12.7776H9.24475L10.5193 15.998H13.3126Z" fill="currentColor"/></svg>`

      case "Arrow Down":
        return `<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 1L1 5L5 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>`

      case "Arrow Left":
        return `<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.6" d="M5 1L1 5L5 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>`

      case "Check":
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.25L6.5 10.75L4 8.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/></svg>`

      case "Copy":
        return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="2.5" width="6" height="9" rx="1" stroke="currentColor"/><path d="M4 4.5V12.5C4 13.0523 4.44772 13.5 5 13.5H10" stroke="currentColor" strokeLinecap="round"/></svg>`

      case "Cross":
        return `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L7 7M7 7L13 13M7 7L1 1M7 7L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>`

      case "Import":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.7457 20L14.8537 15.578H9.1777L7.2857 20H4.7337L12.0157 4.04999L19.2757 20H16.7457ZM10.0577 13.51H13.9517L12.0157 8.97799L10.0577 13.51Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5303 8.46967L23.0607 12L19.5303 15.5303L18.4697 14.4697L20.9393 12L18.4697 9.53033L19.5303 8.46967Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3.06065 12L5.53032 9.53033L4.46966 8.46967L0.939331 12L4.46966 15.5303L5.53032 14.4697L3.06065 12Z" fill="currentColor"/></svg>`

      case "Filter":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1958 5H6.80425C6.01881 5 5.53997 5.86395 5.95625 6.53L9.848 12.7568C9.94733 12.9157 10 13.0994 10 13.2868V16.382C10 16.7607 10.214 17.107 10.5528 17.2764L12.5528 18.2764C13.2177 18.6088 14 18.1253 14 17.382V13.2868C14 13.0994 14.0527 12.9157 14.152 12.7568L18.0438 6.53C18.46 5.86395 17.9812 5 17.1958 5Z" stroke="currentColor" strokeWidth="2"/></svg>`

      case "Google":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0718 4.37818C10.2364 3.59273 9.19031 3.18545 8.0135 3.18545C5.93593 3.18545 4.17071 4.58909 3.53872 6.48L3.52 6.46546V6.50231C3.36 6.98158 3.26545 7.4899 3.26545 8.02C3.26545 8.54358 3.35769 9.04592 3.51413 9.52H3.5426C4.17551 11.413 5.9433 12.8182 8.02391 12.8182C9.10058 12.8182 10.0099 12.527 10.7229 12.0465L10.7431 12.0622C11.5913 11.4949 12.1567 10.6526 12.3455 9.65818H8.04V6.56H15.5745C15.6691 7.08364 15.72 7.62909 15.72 8.19636C15.72 10.6327 14.8473 12.6836 13.3345 14.08H13.3018C11.9794 15.293 10.1747 16 8.02391 16C4.89572 16 2.19675 14.2016 0.88 11.5878V11.583L0.858182 11.6C0.312727 10.5253 0 9.31258 0 8.02C0 6.72742 0.312727 5.51473 0.858182 4.44H0.912766L0.88 4.41455C2.19483 1.79636 4.88987 0 8.0135 0C10.171 0 11.9725 0.792727 13.36 2.08727L11.0718 4.37818Z" fill="currentColor"/></svg>`

      case "Mono":
        return `<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.91402 3.98003L0.878025 2.10403C2.67002 0.984027 4.85402 0.340027 6.70202 0.340027C10.118 0.340027 11.798 1.82403 11.798 4.82003V10.672H13.842V12.716H9.25002V10.756C7.65402 12.156 5.97402 12.996 4.32202 12.996C1.83002 12.996 0.150024 11.568 0.150024 9.49603C0.150024 7.50803 1.55002 6.38803 4.43402 6.05203L9.25002 5.46403V4.93203C9.25002 3.25203 8.35402 2.49603 6.31003 2.49603C4.96602 2.49603 3.34202 3.08403 1.91402 3.98003ZM2.75402 9.41203C2.75402 10.42 3.67802 11.12 5.05002 11.12C6.33802 11.12 7.59802 10.616 9.25002 9.46803V7.03203L4.74202 7.67603C3.39802 7.87203 2.75402 8.43203 2.75402 9.41203Z" fill="currentColor"/></svg>`

      case "Pair":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.15709 14.985H5.12109C4.54909 14.985 4.57109 14.985 4.37309 15.579L3.49309 18.219C3.05309 19.517 3.33909 19.561 4.15309 19.693L4.79109 19.803C4.94509 19.957 4.92309 20.353 4.74709 20.441C4.04309 20.397 3.20709 20.397 2.30509 20.375C1.57909 20.375 0.897087 20.397 0.127087 20.441C-0.0269127 20.331 -0.0489127 20.001 0.105087 19.803L0.765087 19.693C1.40309 19.583 1.64509 19.407 1.97509 18.681C2.23909 18.109 2.59109 17.185 3.05309 15.997L6.06709 8.16499C6.33109 7.46099 6.55109 6.93299 6.48509 6.55899C7.25509 6.40499 7.98109 5.50299 8.02509 5.50299C8.20109 5.50299 8.31109 5.56899 8.39909 5.67899C8.75109 6.66899 9.03709 7.70299 9.38909 8.69299L12.5571 17.911C13.0631 19.385 13.1731 19.517 14.2951 19.737L14.6251 19.803C14.8011 19.957 14.8011 20.331 14.6471 20.441C13.7451 20.397 12.9311 20.375 11.7871 20.375C10.8411 20.375 9.87309 20.419 9.10309 20.441C8.92709 20.331 8.90509 19.935 9.03709 19.803L9.52109 19.737C10.3131 19.627 10.4231 19.495 10.0931 18.571L9.05909 15.579C8.86109 14.985 8.77309 14.985 8.15709 14.985ZM5.47309 13.995H7.87109C8.48709 13.995 8.57509 13.951 8.39909 13.423L7.47509 10.783C7.07909 9.61699 6.94709 9.11099 6.83709 8.95699H6.79309C6.70509 9.11099 6.48509 9.74899 6.11109 10.783L5.12109 13.357C4.90109 13.995 4.94509 13.995 5.47309 13.995Z" fill="currentColor"/><path d="M21.7873 14.375L20.4973 11.36H16.6273L15.3373 14.375H13.5973L18.5623 3.5L23.5123 14.375H21.7873ZM17.2273 9.95H19.8823L18.5623 6.86L17.2273 9.95Z" fill="currentColor"/></svg>`

      case "Plus":
        return `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6H12M6 0L6 12" stroke="currentColor" strokeWidth="2"/></svg>`

      case "Sans":
        return `<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.83557 12.9984C4.07515 12.9984 3.39026 12.863 2.78088 12.5922C2.17672 12.3161 1.69755 11.9099 1.34338 11.3734C0.994425 10.837 0.819946 10.1755 0.819946 9.38904C0.819946 8.71195 0.944946 8.15206 1.19495 7.70935C1.44495 7.26664 1.78609 6.91248 2.21838 6.64685C2.65068 6.38123 3.13765 6.1807 3.67932 6.04529C4.2262 5.90466 4.7913 5.8031 5.37463 5.7406C6.07776 5.66768 6.64807 5.60258 7.08557 5.54529C7.52307 5.48279 7.84078 5.38904 8.0387 5.26404C8.24182 5.13383 8.34338 4.93331 8.34338 4.66248V4.6156C8.34338 4.02706 8.1689 3.57133 7.81995 3.24841C7.47099 2.9255 6.96838 2.76404 6.31213 2.76404C5.61943 2.76404 5.06995 2.91508 4.6637 3.21716C4.26265 3.51925 3.99182 3.87602 3.8512 4.28748L1.21057 3.91248C1.4189 3.18331 1.76265 2.57393 2.24182 2.08435C2.72099 1.58956 3.30693 1.21977 3.99963 0.974976C4.69234 0.724976 5.45797 0.599976 6.29651 0.599976C6.87463 0.599976 7.45015 0.667684 8.02307 0.803101C8.59599 0.938517 9.11943 1.16247 9.59338 1.47497C10.0673 1.78227 10.4476 2.20154 10.734 2.73279C11.0257 3.26404 11.1715 3.9281 11.1715 4.72497V12.7562H8.45276V11.1078H8.35901C8.18713 11.4411 7.94495 11.7536 7.63245 12.0453C7.32515 12.3317 6.93713 12.5635 6.46838 12.7406C6.00484 12.9125 5.46057 12.9984 4.83557 12.9984ZM5.56995 10.9203C6.13765 10.9203 6.62984 10.8083 7.04651 10.5844C7.46318 10.3552 7.78349 10.0531 8.00745 9.6781C8.23661 9.3031 8.3512 8.89425 8.3512 8.45154V7.03748C8.26265 7.11039 8.11161 7.1781 7.89807 7.2406C7.68974 7.3031 7.45536 7.35779 7.19495 7.40466C6.93453 7.45154 6.67672 7.4932 6.42151 7.52966C6.1663 7.56612 5.94495 7.59737 5.75745 7.62341C5.33557 7.6807 4.95797 7.77445 4.62463 7.90466C4.2913 8.03487 4.02828 8.21716 3.83557 8.45154C3.64286 8.6807 3.54651 8.97758 3.54651 9.34216C3.54651 9.863 3.73661 10.2562 4.11682 10.5219C4.49703 10.7875 4.9814 10.9203 5.56995 10.9203Z" fill="currentColor"/></svg>`

      case "Search":
        return `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 17H17V15.5L13 11.5L11.5 13L15.5 17Z" fill="currentColor"/><circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="2"/></svg>`

      case "Serif":
        return `<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.37202 4.375L9.16902 8.899C9.08202 10.581 9.51702 11.451 10.561 11.451C11.054 11.451 11.46 11.132 11.547 11.132C11.692 11.132 11.895 11.451 11.808 11.712C11.228 12.524 9.80702 12.988 8.90802 12.988C8.18302 12.988 7.37102 12.785 6.82002 12.176C6.61702 11.973 6.50103 11.828 6.35602 11.828C6.21102 11.828 6.00802 11.973 5.57302 12.234C5.02202 12.582 4.15202 12.988 3.10802 12.988C1.13602 12.988 0.150024 11.625 0.150024 10.175C0.150024 9.131 0.556025 8.174 2.55702 7.478C3.57202 7.13 4.67402 6.724 5.74702 6.318C6.32702 6.115 6.41402 5.854 6.41402 5.564L6.44302 4.81C6.50102 3.331 6.09502 2.055 4.67402 2.055C3.86202 2.055 3.25302 2.49 3.13702 3.331C3.07902 3.882 2.90502 4.172 2.58602 4.375C2.18002 4.636 1.36802 4.897 0.730024 4.897C0.353024 4.897 0.179024 4.694 0.179024 4.433C0.179024 4.085 0.353024 3.476 1.31002 2.577C2.20902 1.736 4.29702 0.75 5.77602 0.75C8.06702 0.75 9.48802 1.823 9.37202 4.375ZM6.26902 10.001L6.32702 7.913C6.32702 7.594 6.24002 7.42 6.09503 7.42C5.86303 7.42 5.34102 7.565 4.81902 7.768C4.00702 8.058 3.25303 8.464 3.25303 9.711C3.25303 10.465 3.77502 11.393 4.87702 11.393C5.92102 11.393 6.24002 10.697 6.26902 10.001Z" fill="currentColor"/></svg>`

      case "Settings":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5C10.5 4.44772 10.9477 4 11.5 4H12.5C13.0523 4 13.5 4.44772 13.5 5V5.41382C13.5 5.8701 13.8127 6.26038 14.2361 6.43052C14.2765 6.44677 14.3167 6.46345 14.3567 6.48055C14.7764 6.65996 15.2735 6.60514 15.5962 6.28244L15.8891 5.98958C16.2796 5.59905 16.9128 5.59905 17.3033 5.98958L18.0104 6.69668C18.4009 7.08721 18.4009 7.72037 18.0104 8.1109L17.7175 8.40376C17.3948 8.72646 17.34 9.22362 17.5194 9.64324C17.5365 9.68325 17.5532 9.72348 17.5695 9.76393C17.7396 10.1873 18.1299 10.5 18.5862 10.5H19C19.5523 10.5 20 10.9477 20 11.5V12.5C20 13.0523 19.5523 13.5 19 13.5H18.5862C18.1299 13.5 17.7396 13.8127 17.5695 14.2361C17.5532 14.2765 17.5365 14.3167 17.5194 14.3567C17.34 14.7764 17.3949 15.2735 17.7176 15.5962L18.0104 15.8891C18.4009 16.2796 18.4009 16.9128 18.0104 17.3033L17.3033 18.0104C16.9128 18.4009 16.2796 18.4009 15.8891 18.0104L15.5962 17.7175C15.2735 17.3948 14.7764 17.34 14.3568 17.5194C14.3168 17.5365 14.2765 17.5532 14.2361 17.5695C13.8127 17.7396 13.5 18.1299 13.5 18.5862V19C13.5 19.5523 13.0523 20 12.5 20H11.5C10.9477 20 10.5 19.5523 10.5 19V18.5862C10.5 18.1299 10.1873 17.7396 9.76393 17.5695C9.72348 17.5532 9.68325 17.5365 9.64324 17.5194C9.22362 17.34 8.72646 17.3948 8.40376 17.7175L8.11091 18.0104C7.72039 18.4009 7.08722 18.4009 6.6967 18.0104L5.98959 17.3033C5.59907 16.9128 5.59907 16.2796 5.98959 15.8891L6.28244 15.5962C6.60514 15.2735 6.65996 14.7764 6.48055 14.3567C6.46345 14.3167 6.44677 14.2765 6.43052 14.2361C6.26038 13.8127 5.8701 13.5 5.41382 13.5H5C4.44772 13.5 4 13.0523 4 12.5V11.5C4 10.9477 4.44772 10.5 5 10.5H5.41382C5.8701 10.5 6.26038 10.1873 6.43052 9.76393C6.44677 9.72348 6.46346 9.68325 6.48056 9.64324C6.65997 9.22362 6.60515 8.72646 6.28245 8.40376L5.98961 8.11091C5.59908 7.72039 5.59908 7.08722 5.98961 6.6967L6.69672 5.98959C7.08724 5.59906 7.7204 5.59906 8.11093 5.98959L8.40378 6.28244C8.72648 6.60514 9.22364 6.65996 9.64326 6.48055C9.68326 6.46345 9.72349 6.44677 9.76393 6.43052C10.1873 6.26038 10.5 5.8701 10.5 5.41382V5Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>`

      case "Style":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url#clip0_1487_1202">  <path d="M3.99999 4.5L5.73205 7.5H4.49999L4.49999 16H5.73205L4 19L2.26794 16H3.49999L3.5 7.5L2.26794 7.5L3.99999 4.5Z" fill="currentColor"/>  <path d="M9.82478 19H7.49524L12.7296 4.45459H15.2651L20.4995 19H18.17L14.0577 7.09663H13.9441L9.82478 19ZM10.2154 13.304H17.7722V15.1506H10.2154V13.304Z" fill="currentColor"/></g></svg>`

      case "Test":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 4.75H12V3.25H24V4.75Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 8.75H12V7.25H24V8.75Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12.75H12V11.25H24V12.75Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 16.75H0V15.25H24V16.75Z" fill="currentColor"/><pathfill-rule="evenodd" clip-rule="evenodd" d="M24 20.75H0V19.25H24V20.75Z" fill="currentColor"/><path d="M9.02004 13L7.81604 10.186H4.20404L3.00004 13H1.37604L6.01004 2.84998L10.63 13H9.02004ZM4.76404 8.86998H7.24204L6.01004 5.98598L4.76404 8.86998Z" fill="currentColor"/></svg>
`
    }
  }
}

export default Icons;