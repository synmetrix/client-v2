export default function getTables(obj: object, prefix: string = "") {
  return Object.entries(obj).reduce((acc: { name: string }[], [key, value]) => {
    let result = acc;
    const newPath = prefix ? `${prefix}.${key}` : key;

    if (value === true) {
      const lastSlashIndex = newPath.lastIndexOf(".");
      const formattedPath = `${newPath.slice(
        0,
        lastSlashIndex
      )}.${newPath.slice(lastSlashIndex + 1)}`;
      result.push({ name: formattedPath });
    }

    if (typeof value === "object") {
      const childResults = getTables(value, newPath);
      result = acc.concat(childResults);
    }

    return result;
  }, []);
}
