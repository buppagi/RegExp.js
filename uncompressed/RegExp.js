function checkName(event) {
  var node = getTarget(event);
  var result;

  if( node.value == "" ) {
    result =  "필수 정보입니다.";
  } else {
    result = "";
  } // endif

  showError(node, result);

  return stopPropagation( event);
}

function checkFirst(event) {
  var node = getTarget(event);
  var result;

  if( node.value == "" ) {
    result =  "성을 입력해주세요.";
  } else {
    result = "";
  } // endif

  showError(node, result);

  return stopPropagation( event);
}

function checkLast(event) {
  var node = getTarget(event);
  var result;

  if( node && node.value == "" ) {
    result =  "이름을 입력해주세요.";
  } else {
    result = "";
  } // endif

  showError(node, result);

  return stopPropagation( event);

}


function CheckEmail( event ) {
  var node = getTarget(event);
  var email = node.value;
  var errorMessage = "필수 정보입니다.";
  var isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isHan = /[ㄱ-ㅎ가-힣]/g;

  if(email == "") {
    showError(node, errorMessage);
  } else if (!isEmail.test(email) || isHan.test(email)) {
    errorMessage = "올바른 메일 형식이 아닙니다.";
    showError(node, errorMessage);
  } else {
    errorMessage = "";
    showSuccess(node, errorMessage);
  }
}

function isHPhone(event, required) {
  var node = getTarget(event);
  var phone = node.value;
  var HPhonePattern = /^((01[1|6|7|8|9])[1-9][0-9]{6,7})$|(010[1-9][0-9]{7})$/;
  var result = '';
  if (phone == '') {
    if (required == true) { //필수체크
      result = "필수 정보입니다.";
    } else {
      result = "";
    }
    showError(node, result);
  } else if(!HPhonePattern.test(phone)) {
    result = '형식에 맞지 않는 번호입니다.';
    showError(node, result);
  } else {
    result = '';
    showSuccess(node, result);
  }
}

function CheckDate( event, required ) {
  var node = getTarget(event);
  var str =  /^[0-9]+$/;
  var birth = node.value;
  var y = parseInt(birth.substr(0, 4), 10);
  var m = parseInt(birth.substr(4, 2), 10);
  var d = parseInt(birth.substr(6, 2), 10);
  var dt = new Date(y, m-1, d);
  var errorMessage;

  if(birth == "") {
    if (required == true) { //필수체크
      errorMessage = "필수 정보입니다.";
    } else {
      errorMessage = "";
    }
    showError(node, errorMessage);
  } else if (dt.getDate() != d || dt.getMonth()+1 != m || dt.getFullYear() != y  ) {
    errorMessage = "날짜형식이 맞지 않습니다.";
    showError(node, errorMessage);
  } else {
    errorMessage = "";
    showSuccess(node, errorMessage);
  }
}

function CheckNumberic( event ) {
  var node = getTarget(event);
  var str =  /^[0-9]+$/;
  var result;

  if( node.value == "" ) {
    result = "예약번호를 입력해주세요.";
    showError(node, result);
  } else if( !str.test(node.value) ) {
    result = "숫자만 입력하셔야합니다.";
    showError(node, result);
  } else {
    result = "";
    showSuccess(node, result);
  }

  return stopPropagation( event );
}
// 숫자만 입력
function CheckNumber(event) {
  var node = getTarget(event);
  var val = node.value;
  var regex =  /[^0-9]/g;
  val = val.replace(regex, '');
  node.value = val;
}

function getTarget( event ) {
  var e = event || window.event;

  if( e.target )
  return e.target;
  else
  return e.srcElement;
}

function stopPropagation( event ) {

  if( event.stopPropagation )
  event.stopPropagation();

  if( event.preventDefault )
  event.preventDefault();

  if( event.cancelBubble)
  event.cancelBubble = true;

  if(event.returnValue)
  event.returnValue = false;

  return false;
}

function showError(node, message) {
  var id = node.id + "_error";

  var node_error = document.getElementById( id );

  if( node_error )
  node_error.innerHTML = message;

  if( message == "" ) {
    node.setAttribute('aria-invalid', 'false');
    node_error.style.display = "none";
  } else {
    node.setAttribute('aria-invalid', 'true');
    node_error.style.display = "block";
  }
}

function showSuccess(node, message) {
  var id = node.id + "_error";

  var node_error = document.getElementById( id );

  if( node_error )
  node_error.innerHTML = message + "<span class=\"icon sm\" aria-hidden=\"true\"></span>";

  if( message == "" ) {
    node.setAttribute('aria-invalid', 'false');
    node_error.style.display = "block";
  }
}

function fncChkByte(event, maxByte) {
  var node = getTarget(event);
  var str = node.value;
  var str_len = str.length;
  var byte = 0;
  var len = 0;
  var one_char = "";
  var str2 = "";
  var erroId = node.id + "_error";
  var errorElem = document.getElementById( erroId );

  for ( var i=0; i < str_len; i++ ) {
    one_char = str.charAt(i);

    if (escape(one_char).length > 4) {
      byte += 2;
    } else {
      byte++;
    }

    if (byte <= maxByte) {
      len = i + 1;
    }
  }

  if(byte > maxByte) {
    errorElem.classList.remove('sm');
    showError(node, maxByte + "자를 초과 입력 할 수 없습니다. 초과된 내용은 자동으로 삭제 됩니다. ");
    str2 = str.substr(0, len);
    node.value = str2;
  } else {
    errorElem.classList.add('sm');
    errorElem.innerText = byte;
  }
}

// file image
function handleFileSelect(event, outputId) {
  var files = event.target.files; // FileList object
  var node = getTarget(event);

  // 파일리스트를 반복하며, 이미지 파일로 축소하여 렌더링한다.
  for (var i=0, f; f=files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // 클로저를 사용하여 파일정보를 캡처
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        document.getElementById(outputId).value = escape(theFile.name);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);

  }
}
