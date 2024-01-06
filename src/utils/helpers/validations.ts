import construe from "cronstrue/i18n";

export default {
  email: (value: string): boolean =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
  // password: (value: string): boolean =>
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
  password: (value: string): boolean => /^(.+){6,}$/.test(value),
  cronExp: (value: string): boolean | string => {
    try {
      construe.toString(value);
    } catch (error) {
      return error as string;
    }

    return true;
  },
  url: (value: string): boolean =>
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      value
    ),
  json: (value: string): boolean => {
    try {
      const json = JSON.parse(value);

      if (typeof json !== "object" || json === null) return false;
      return true;
    } catch (e) {
      return false;
    }
  },
};
