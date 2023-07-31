export default {
  email: (value: string): boolean | string =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
  passsword: (value: string): boolean | string =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
};
