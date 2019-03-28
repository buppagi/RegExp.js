# 자바스크립트 유효성 검사
> UI개발할 때 필요한 유효성(정규식) 검사 스크립트들을 모아둔 것입니다. 


## 설치방법
+ [다운로드.zip](https://github.com/buppagi/RegExp.js/archive/master.zip) 또는 [Min 파일](https://raw.githubusercontent.com/buppagi/RegExp.js/master/minified/RegExp.min.js)을 받습니다.
+ `<head></head>`사이 또는 `<body>` 영역에 `<script src="RegExp.min.js"></script>` 삽입하시면 됩니다.



## 사용방법
<p>required 속성은 필수입력을 나타냅니다.</p>

```html
<body>
  <form>
    <!-- 이름 -->
    <label for="name">
      
      <input type="text" id="name" placeholder="이름" required aria-invalid="false" aria-describedby="name_error" onblur="checkName(event)">
    </label>
   <div class="error" id="name_error" role="alert" aria-atomic="true" aria-live="assertive"></div>

    <!-- Email -->
   <label for="email">
    <input type="text" class="non-kor email" id="email" placeholder="예) buppagistar@gmail.com" aria-required="true" aria-invalid="true" aria-describedby="email_error" onblur="CheckEmail(event)">
    </label>
    <div class="error" id="email_error" role="alert" aria-atomic="true" aria-live="assertive"></div>

    <!-- 생년월일 -->
    <label for="birth" class="bithday">
      <input type="text" class="non-kr" id="birth" placeholder="예) 20191231" maxlength="8" aria-invalid="false" aria-describedby="birth_error" onkeyup="CheckNumber(event)" onblur="CheckDate(event, false)">
    </label>
    <div class="error" id="birth_error" role="alert" aria-atomic="true" aria-live="assertive"></div>
  </form>

  <script src="RegExp.min.js"></script>
</body>
```
### Screenshot
#### 기본
- 포커스 전 [input=text]
![form-input-text](https://raw.githubusercontent.com/buppagi/RegExp.js/master/images/form-input-text-default.PNG)

- 포커스아웃 후
![form-default](https://raw.githubusercontent.com/buppagi/RegExp.js/master/images/form-default.PNG)

#### 이메일 / 생년월일
- 이메일 포커 아웃 후
![form-default-email](https://raw.githubusercontent.com/buppagi/RegExp.js/master/images/form-input-email.PNG)
- 생년월일 포커아웃 후
![form-default-date](https://raw.githubusercontent.com/buppagi/RegExp.js/master/images/form-input-date.PNG)

### 추가
<p>이메일 또는 생년월일을 입력할 때 한글을 입력조차 안되게 하는 방법입니다.</p>

```html
<!-- 
  jQuery가 있어야 사용가능합니다.
  추후 스크립트에 적용할 예정입니다.
-->
<script type="text/javascript">
  $(document).ready(function(){
    $('input[type=text].non-kr').on('blur keyup', function(){
      var $this = $(this);
      var regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
      var v = $this.val();
      if (regexp.test(v)) {
        $this.val(v.replace(regexp, ''));
      } else if(!$this.hasClass('email')) {
        $this.val( $this.val().toUpperCase() );
      }
    });
  });
</script>
```
[예시사이트](http://www.buppagistar.com/this-is-the-javascript-validation-i-used/)에 가면 사용예제와 화면설명이 되어있습니다.

## 마치며
<p>UI개발을 하면서 폼 작성을 은근 많이하게 되어 소스를 정리하게 되었습니다. </p>
<p>혼자 가지고 있는 것보단 공유하는 것이 더 좋겠다고 판단되어 이렇게 공유하니 혹시 소스가 잘못되거나 더 좋은 방법이 있다면 피드백 주시면 감사하겠습니다.</p>