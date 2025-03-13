function Icons(name, classes) {

  const icon = document.createElement('div');
  icon.className = classes ? classes : "icon";
  icon.dataset.icon = name;
  icon.innerHTML = getSvg();
  icon.ariaHidden = true;

  return icon;

  function getSvg() {
    
    switch(name) {
      case "Adobe":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 11.4991L6.95537 4.5H9.04463L11.9976 11.4991L12 11.5L4 11.4991ZM9.88345 11.4991L8 7.07487L6.70742 10.0902H8.0857L8.64899 11.4991H9.88345Z" fill="currentColor"/></svg>
`

      case "Arrow Down":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00006 8.9394L4.53039 5.46973L3.46973 6.53039L8.00006 11.0607L12.5304 6.53039L11.4697 5.46973L8.00006 8.9394Z" fill="currentColor"/></svg>`

      case "Arrow Left":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.0606 8.00006L10.5303 4.53039L9.46961 3.46973L4.93928 8.00006L9.46961 12.5304L10.5303 11.4697L7.0606 8.00006Z" fill="currentColor"/></svg>`

      case "Arrow Right":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.9394 7.99994L5.46973 11.4696L6.53039 12.5303L11.0607 7.99994L6.53039 3.46961L5.46973 4.53027L8.9394 7.99994Z" fill="currentColor"/></svg>`

      case "Google":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.63448 6.18909C9.20935 5.79636 8.677 5.59273 8.07812 5.59273C7.02083 5.59273 6.1225 6.29455 5.80087 7.24L5.79135 7.23273V7.25116C5.70992 7.49079 5.66181 7.74495 5.66181 8.01C5.66181 8.27179 5.70875 8.52296 5.78836 8.76H5.80285C6.12494 9.70652 7.02458 10.4091 8.08341 10.4091C8.63134 10.4091 9.09412 10.2635 9.45693 10.0232L9.46722 10.0311C9.89887 9.74747 10.1866 9.32631 10.2827 8.82909H8.0916V7.28H11.926C11.9741 7.54182 12 7.81455 12 8.09818C12 9.31636 11.5559 10.3418 10.786 11.04H10.7694C10.0964 11.6465 9.17795 12 8.08341 12C6.49146 12 5.11794 11.1008 4.44784 9.79389V9.79151L4.43673 9.8C4.15915 9.26264 4 8.65629 4 8.01C4 7.36371 4.15915 6.75736 4.43673 6.22H4.46451L4.44784 6.20727C5.11696 4.89818 6.48848 4 8.07812 4C9.17608 4 10.0929 4.39636 10.799 5.04364L9.63448 6.18909Z" fill="currentColor"/></svg>`

      case "Swap":
        return `<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6787 8.32143C10.6787 9.80076 9.47947 11 8.00014 11C7.26026 11 6.59165 10.701 6.1061 10.2155L5.67771 9.78707L6.28613 9.17864L4.00042 9.17864L4.00042 11.4644L4.61705 10.8477L5.04544 11.2761C5.80079 12.0315 6.84647 12.5 8.00014 12.5C10.3079 12.5 12.1787 10.6292 12.1787 8.32143L10.6787 8.32143Z" fill="currentColor"/><path d="M5.32129 7.75035C5.32129 6.27101 6.52053 5.07178 7.99986 5.07178C8.73974 5.07178 9.40835 5.37077 9.8939 5.85631L10.3223 6.28471L9.71387 6.89314H11.9996V4.60742L11.383 5.22405L10.9546 4.79565C10.1992 4.0403 9.15353 3.57178 7.99986 3.57178C5.6921 3.57178 3.82129 5.44259 3.82129 7.75035L5.32129 7.75035Z" fill="currentColor"/></svg>`
    }
  }
}

export default Icons;