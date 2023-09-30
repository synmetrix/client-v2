function objectIs(a: number, b: number) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }

  return a !== a && b !== b;
}

export default typeof Object.is === "function" ? Object.is : objectIs;
