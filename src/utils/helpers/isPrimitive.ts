const isPrimitive = (val: any) => {
  return val == null || /^[sbn]/.test(typeof val);
};

export default isPrimitive;
