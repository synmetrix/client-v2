import moment from "moment";

export const CARD_TIME_FORMAT = "DD.MM.YYYY/ h:mm A";
export const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";

export default (timestamp: string, format?: string) => {
  const result = moment(timestamp).format(format || DEFAULT_TIME_FORMAT);

  if (result === "Invalid date") {
    return timestamp;
  }

  return result;
};
