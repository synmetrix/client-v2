const flattenTables = (obj: any, path?: string): any[] => {
  return Object.keys(obj).reduce((acc: any[], key: string) => {
    const newPath = path ? `${path}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return [...acc, ...flattenTables(obj[key], newPath)];
    } else {
      return [...acc, { schema: path, name: key }];
    }
  }, []);
};

export default flattenTables;
