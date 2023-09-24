import deepEqual from "dequal";

import isPrimitive from "@/utils/helpers/isPrimitive";

import type { DependencyList, EffectCallback } from "react";

function checkDeps(deps?: DependencyList) {
  if (!deps || !deps.length) {
    throw new Error(
      "useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead."
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      "useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead."
    );
  }
}

function useDeepCompareMemoize(value?: DependencyList) {
  const ref = useRef<DependencyList>();

  //@ts-ignore
  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies?: DependencyList
) {
  if (process.env.NODE_ENV !== "production") {
    checkDeps(dependencies);
  }
  useEffect(callback, [callback, useDeepCompareMemoize(dependencies)]);
}

export function useDeepCompareEffectNoCheck(
  callback: EffectCallback,
  dependencies?: DependencyList
) {
  useEffect(callback, [callback, useDeepCompareMemoize(dependencies)]);
}

export default useDeepCompareEffect;
