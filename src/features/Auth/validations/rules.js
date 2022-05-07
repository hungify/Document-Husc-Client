export const authRules = {
  email: [
    {
      required: true,
      message: "Vui lòng nhập vào email!",
    },
    {
      type: "email",
      message: "Email không đúng định dạng!",
    },
  ],
  password: [
    {
      required: true,
      message: "Vui lòng nhập vào mật khẩu!",
    },
    {
      min: 6,
      message: "Mật khẩu phải có ít nhất 6 ký tự!",
    },
    {
      max: 30,
      message: "Mật khẩu phải có tối đa 30 ký tự!",
    },
  ],
  username: [
    {
      required: true,
      message: "Vui lòng nhập vào tên đăng nhập!",
    },
    {
      min: 6,
      message: "Tên đăng nhập phải có ít nhất 6 ký tự!",
    },
    {
      max: 30,
      message: "Tên đăng nhập phải có tối đa 30 ký tự!",
    },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: "Tên đăng nhập không được chứa ký tự đặc biệt!",
    },
  ],
  department: [
    {
      required: true,
      message: "Vui lòng chọn tên phòng ban!",
    },
  ],
};
