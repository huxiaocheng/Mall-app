export function hasClass(el, className) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return reg.test(el.className);
}

export function addClass(el, className) {
  if(!hasClass(el, className)) {
    el.className += ` ${className}`;
  }
}

export function removeClass(el, className) {
  if(hasClass(el, className)) {
    const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
    el.className = el.className.replace(reg, ' ');
  }
}