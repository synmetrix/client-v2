import { Typography } from "antd";

import transpose from "@/utils/helpers/transpose";

import s from "./index.module.less";

import type { FC } from "react";

interface HighlightProps {
  index: number;
  text: string;
  indices: number[][];
}

const { Text } = Typography;

const buildHightlight = (value: string, indices: number[][]) => {
  let res: any = [];

  const transposedIndices = transpose(indices);

  const startAtSet = new Set(transposedIndices[0]);
  const endAtSet = new Set(transposedIndices[1]);

  let breakAt = 0;

  for (let i = 0; i < value.length; i++) {
    const index = Number(i); // I have no idea why index is a String

    const nextCharIndex = index + 1;

    if (startAtSet.has(index)) {
      res = [...res, value.substring(breakAt, index)];

      breakAt = index;
    }

    if (endAtSet.has(index)) {
      res = [
        ...res,
        <span key={index} className={s.highlight}>
          {value.substring(breakAt, nextCharIndex)}
        </span>,
      ];

      breakAt = nextCharIndex;
    }
  }

  res = [...res, value.substring(breakAt)];

  return res;
};

const Highlight: FC<HighlightProps> = ({
  index,
  text,
  indices,
  ...restProps
}) => {
  if (!indices.length) {
    return null;
  }

  return (
    <div className={s.row} {...restProps}>
      <Text className={s.text} type="secondary">
        line {index}:&nbsp;
      </Text>
      <Text className={s.text} code>
        {buildHightlight(text, indices)}
      </Text>
    </div>
  );
};

export default Highlight;
