export default function getTables(obj: object, prefix: string = "") {
  return Object.entries(obj).reduce(
    (acc: { schema: string; name: string }[], [key, value]) => {
      let result = acc;
      const newPath = prefix ? `${prefix}.${key}` : key;

      if (value === true) {
        const lastDotIndex = newPath.lastIndexOf(".");
        const schema = newPath.slice(0, lastDotIndex) || "";
        const name = newPath.slice(lastDotIndex + 1);
        result.push({ schema, name });
      }

      if (typeof value === "object" && value !== null) {
        const childResults = getTables(value, newPath);
        result = acc.concat(childResults);
      }

      return result;
    },
    []
  );
}
