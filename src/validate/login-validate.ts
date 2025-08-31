/** login ID validate */
export const ID = {
  min: { value: 1, message: "아이디를 입력해주세요." },
  max: { value: 30, message: "아이디는 30자 이내로 입력 바랍니다." },
  regex: {
    // 영문 대/소문자 + 숫자 조합, 5~30자
    value: /^[a-zA-Z0-9]{5,30}$/,
    message: "아이디는 영문 대/소문자 + 숫자 조합으로 5~30자 입력 가능합니다.",
  },
  required: { message: "아이디를 입력해주세요." },
};

/** login password validate */
export const PASSWORD = {
  min: { value: 1, message: "비밀번호를 입력해주세요." },
  max: { value: 30, message: "비밀번호는 30자 이내로 입력 바랍니다." },
  regex: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{10,30}$/g,
    message:
      "비밀번호는 영문 대소문자 + 숫자 + 특수문자 포함, 10~30자리, 공백 제외하여 입력 가능합니다.",
  },
  required: { message: "비밀번호를 입력해주세요." },
};
