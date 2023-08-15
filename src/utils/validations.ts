import cron from "cron-validate";

export default {
  email: (value: string): boolean =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
  passsword: (value: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
  cronExp: (value: string): boolean => cron(value).isValid(),
};
