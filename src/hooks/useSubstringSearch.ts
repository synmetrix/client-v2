import { useState, useEffect } from "react";
import { getOr } from "unchanged";

import type { Dataschema } from "@/types/dataschema";

const getIndices = (text: string, find: string) => {
  const regex = new RegExp(find, "ig");

  const res: number[][] = [];
  text.replace(regex, (match: string, index: number) => {
    res.push([index, index + match.length - 1]);
    return match;
  });

  return res;
};

type MatchedLines = Record<
  number,
  {
    line: string;
    indices: number[][];
  }
>;

interface DataschemaWithMatchedLines extends Dataschema {
  matchedLines?: MatchedLines;
}

const search = (
  items: Dataschema[],
  searchKey: string,
  searchTerm: string
): DataschemaWithMatchedLines[] => {
  if (!searchTerm) {
    return items;
  }

  const result: DataschemaWithMatchedLines[] = [];

  items.forEach((item) => {
    const matchedLines: MatchedLines = {};

    const value = getOr("", searchKey, item);
    value.split("\n").forEach((line: string, index: number) => {
      const indices = getIndices(line, searchTerm);

      if (indices.length) {
        matchedLines[Number(index + 1)] = { line, indices };
      }
    });

    result.push({
      ...item,
      matchedLines,
    });
  });

  return result;
};

export default (
  items: Dataschema[],
  searchKey: string,
  searchTerm: string = ""
) => {
  const [term, setTerm] = useState(searchTerm);
  const [matchedItems, setItems] = useState<DataschemaWithMatchedLines[]>([]);

  useEffect(() => {
    const updateState = () => {
      const filteredItems: DataschemaWithMatchedLines[] = search(
        items,
        searchKey,
        term
      ).filter(
        (v: DataschemaWithMatchedLines) =>
          Object.keys(v.matchedLines || {}).length
      );

      setItems(filteredItems);
    };

    const timer = setTimeout(updateState, 300);
    return () => clearTimeout(timer);
  }, [items, searchKey, term]);

  return {
    term,
    matchedItems,
    setTerm,
  };
};
