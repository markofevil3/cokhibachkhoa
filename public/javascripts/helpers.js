function createNode(html) {
  var tempDiv = document.createElement('div');

  tempDiv.innerHTML = html;
  return tempDiv.firstChild;
};

function removeFromDocument(node) {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
};

function isHash(obj) {
  return obj.constructor == Object;
};

function ajax(url, query, callback, error) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      if (http.status == 200) {
        if (callback) {
          callback(http.responseText);
        }
      } else {
        if (error) {
          error(http.responseText);
        }
      }
    }
  };

  // var fullUrl = 'https://%SERVER%' + url;
  var fullUrl = url;
  if (query) {
    if (isHash(query)) {
      var isFirstParameter = true;
      for (var key in query) {
        fullUrl += (isFirstParameter ? '?' : '&');
        isFirstParameter = false;

        fullUrl += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
      }
    } else if (query.length > 0) {
      fullUrl += '?' + query;
    }
  }

  fullUrl += '&timestamp=' + Date.now();
  http.open('GET', fullUrl);
  // http.setRequestHeader("Access-Control-Allow-Origin", "*");
  http.send();
};

function ajaxPost(url, query, callback, error) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      if (http.status == 200) {
        if (callback) {
          callback(http.responseText);
        }
      } else {
        if (error) {
          error(http.responseText);
        }
      }
    }
  };

  // var fullUrl = 'https://%SERVER%' + url;
  var fullUrl = url;
  var params = '';
  if (query) {
    if (isHash(query)) {
      var isFirstParameter = true;
      for (var key in query) {
        params += (isFirstParameter ? '' : '&');
        isFirstParameter = false;

        params += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
      }
    } else if (query.length > 0) {
      params += query;
    }
  }
  params += '&timestamp=' + Date.now();
  http.open('POST', fullUrl, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.send(params);
};

function h(text) {
  if (text == null) {
    return null;
  }

  return String(text).replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/&/g, '&amp;');
};

function now() {
  return new Date().getTime();
};

function replaceAt(s, index, c) {
  return s.substr(0, parseInt(index)) + c + s.substr(parseInt(index) + c.length);
};

function getOffset(obj) {
  var x = 0;
  var y = 0;
  while (obj) {
    x += obj.offsetLeft;
    y += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return {'x': x , 'y': y};
};

function arrayRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
};

function arrayShuffle(oldArray) {
	var newArray = oldArray.slice();
 	var len = newArray.length;
	var i = len;
  while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = newArray[i];
    newArray[i] = newArray[p];
    newArray[p] = t;
 	}
	return newArray; 
};

function calculateDistance(object1, object2) {
  return Math.sqrt((Math.pow(object2.x - object1.x, 2) + Math.pow(object2.y - object1.y, 2)));
}

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function confirm_prompt(text) {
 	return confirm(text);
}
