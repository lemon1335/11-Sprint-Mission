// 변수선언
const regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const loginForm = document.getElementById("login-form");
const validInputs = document.querySelectorAll("[data-valid]");
const btnAbled = document.getElementById("login-button");

inputEmail.addEventListener("focusout", (e) => printEventType(e, "email"));

inputPassword.addEventListener("focusout", (e) =>
  printEventType(e, "password")
);

function printEventType(e, type) {
  //변수 선언
  const inputValue = e.target.value;
  const parentElement = e.target.parentElement;
  const validationMessage = parentElement.querySelector(".invalid-text");

  //이메일 값 확인
  if (type === "email") {
    if (inputValue === "") {
      validationMessage.textContent = "이메일을 입력해주세요.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    } else if (!regex.test(inputValue)) {
      validationMessage.textContent = "잘못된 이메일 형식입니다.";
      e.target.dataset.valid = false;
      inputEmail.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    validationMessage.textContent = "";
    inputEmail.classList.remove("invalid-mark");
  }

  // 비밀번호 값 확인
  if (type === "password") {
    if (inputValue === "") {
      validationMessage.textContent = "비밀번호를 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    } else if (inputValue.length < 8) {
      validationMessage.textContent = "비밀번호를 8자 이상 입력해주세요.";
      e.target.dataset.valid = false;
      inputPassword.classList.add("invalid-mark");
      return;
    }
    e.target.dataset.valid = true;
    validationMessage.textContent = "";
    inputPassword.classList.remove("invalid-mark");
  }

  // 버튼 활성화
  loginForm.addEventListener("focusout", (e) => updateButtonState(e));

  function updateButtonState(e) {
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
  console.log(regex.test(inputValue));
  console.log(validationMessage);
  console.log(e, type);
}
