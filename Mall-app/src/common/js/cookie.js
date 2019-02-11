export function setCookie(key, value, day) {
  const d = new Date();
  d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${key}=${value};${expires}; path=/`;
}

export function getCookie(name) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

export function deleteCokie(name) {
  setCookie(name, "", -1);
}