// 변수선언
const inputEmail = document.getElementById("signup-email");
const inputNickname = document.getElementById("signup-nickname");
const inputPassword = document.getElementById("signup-password");
const checkoutPassword = document.getElementById("checkout-password");
const signupForm = document.getElementById("signup-form");
const validInputs = document.querySelectorAll("[data-valid]");
const btnAbled = document.getElementById("signup-button");

inputEmail.addEventListener("focusout", (e) => printEventType(e, "email"));

inputPassword.addEventListener("focusout", (e) =>
  printEventType(e, "password")
);

inputNickname.addEventListener("focusout", (e) => printEventType(e, "text"));

checkoutPassword.addEventListener("focusout", (e) =>
  printEventType(e, "password")
);

function printEventType(e, type) {
  //이메일 유효값 확인
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  //변수 선언
  const invalidType = e.target.value;
  const parentElement = e.target.parentElement;
  const markText = parentElement.querySelector(".invalid-text");

  //이메일 값 확인
  if (type === "email") {
    if (invalidType === "") {
      markText.textContent = "이메일을 입력해주세요.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    } else if (!regex.test(invalidType)) {
      markText.textContent = "잘못된 이메일 형식입니다.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    markText.textContent = "";
    inputEmail.classList.remove("invalid-mark");
  }

  //닉네임 값 확인
  if (type === "text") {
    if (invalidType === "") {
      markText.textContent = "닉네임을 입력해주세요";
      e.target.dataset.valid = false;
      inputNickname.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    markText.textContent = "";
    inputNickname.classList.remove("invalid-mark");
  }

  //비밀번호값 확인
  if (type === "password") {
    if (invalidType === "") {
      markText.textContent = "비밀번호를 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    } else if (invalidType.length < 8) {
      markText.textContent = "비밀번호를 8자 이상 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    markText.textContent = "";
    inputPassword.classList.remove("invalid-mark");
  }

  //비밀번호 일치 확인
  if (type === "password") {
    if (invalidType !== inputPassword.value) {
      markText.textContent = "비밀번호가 일치하지 않습니다..";
      e.target.dataset.valid = false;
      checkoutPassword.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    markText.textContent = "";
    checkoutPassword.classList.remove("invalid-mark");
  }

  //버튼 활성화
  signupForm.addEventListener("focusout", (e) => checkoutBtn(e));

  function checkoutBtn(e) {
    const result = Array.from(validInputs).every(
      (e) => e.dataset.valid === "true"
    );
    console.log(result + "completed");

    if (result) {
      btnAbled.disabled = false;
    }
    btnAbled.classList.toggle("active", result);
  }

  e.target.dataset.valid = true;
  console.log(regex.test(invalidType));
  console.log(markText);
  console.log(e, type);
}
