import { useState, useEffect, useCallback } from "react";
import { getOr } from "unchanged";

import fromPairs from "@/utils/helpers/fromPairs";

interface Props {
  query: string;
  availableQueryMembers: Record<string, any>;
  categories: string[];
  openedCubes: string[];
}

export default ({
  query,
  availableQueryMembers,
  categories,
  openedCubes,
}: Props) => {
  const [state, setState] = useState({
    radioValue: "all",
    query,
    members: availableQueryMembers,
    categories,
    openedCubes,
  });

  const filter = useCallback(
    () => {
      // let's go through all keys and filter necessary
      const reducer = (acc: object, curr: [string, Record<string, object>]) => {
        const [cube, allMembers] = curr;

        const values = state.categories.reduce(
          (catAcc: object, cat: string) => {
            let categoryMembers = Object.entries(allMembers[cat] || {});

            if (state.query) {
              categoryMembers = categoryMembers.filter((member) => {
                // member[1] – value, from (categoryKey, categoryObject)
                // 1.title – it's a title of category object
                const lowerTitle = getOr("", "1.title", member).toLowerCase();

                return lowerTitle.indexOf(state.query.toLowerCase()) > -1;
              });
            }

            return {
              ...catAcc,
              [cat]: fromPairs(categoryMembers),
            };
          },
          {}
        );

        return {
          ...acc,
          [cube]: values,
        };
      };

      const newMembers = Object.entries(availableQueryMembers).reduce(
        reducer,
        {}
      );

      return newMembers;
    },
    // reinit function on query or category change
    [state.query, state.categories, availableQueryMembers]
  );

  useEffect(() => {
    const newMembers = filter();

    setState((prev) => ({
      ...prev,
      members: newMembers,
    }));
  }, [filter]);

  return {
    state,
    setState,
  };
};
