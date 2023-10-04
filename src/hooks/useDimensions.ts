import { useRef } from "react";
import { useSize } from "ahooks";

const useDimensions = (dom: Element | null = null) => {
  const ref = useRef();
  const size = useSize(dom || ref);

  return { element: dom || ref, size };
};

export default useDimensions;
