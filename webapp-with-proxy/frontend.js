var today = new Date();
var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days
    
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function sendData(url, data, callback) {
  var xhr = new XMLHttpRequest();
  var proxyurl = "http://proxy.tokyo-foundation.com:8081/" + url;
  //var proxyurl = "http://127.0.0.1:8081/" + url;
  xhr.open("POST", proxyurl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      callback(json);
    }
  };
  xhr.send(data);
}

function printJSON(response) {
  console.log(response);
}

function request() {
  console.log("sending POST request...");
  var data = JSON.stringify({});
  sendData("http://json-server.nagoya-foundation.com:3000/posts", data, printJSON);
}