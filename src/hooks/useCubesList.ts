import { useState, useEffect, useCallback } from "react";
import { getOr } from "unchanged";

import fromPairs from "@/utils/helpers/fromPairs";
import type { Cube } from "@/types/cube";

interface Props {
  query: string;
  availableQueryMembers: Record<string, Cube>;
  categories: string[];
  openedCubes: string[];
}

interface State {
  radioValue: string;
  query: string;
  members: Record<string, Cube | Cube[] | Record<string, Cube[]>>;
  categories: string[];
  openedCubes: string[];
}

export default ({
  query,
  availableQueryMembers,
  categories,
  openedCubes,
}: Props) => {
  const [state, setState] = useState<State>({
    radioValue: "all",
    query,
    members: availableQueryMembers,
    categories,
    openedCubes,
  });

  const filter = useCallback(
    () => {
      // let's go through all keys and filter necessary
      const reducer = (
        acc: Record<string, Cube | Cube[] | Record<string, Cube[]>>,
        curr: [string, Cube | Record<string, Cube | Cube[]>]
      ) => {
        const [cube, allMembers] = curr;

        const values = state.categories.reduce(
          (catAcc: Record<string, Cube[]>, cat: string) => {
            let categoryMembers = Object.entries(
              allMembers[cat as keyof typeof allMembers] || {}
            );

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

      const entires = Object.entries(availableQueryMembers);

      let newMembers: Record<string, Cube | Cube[] | Record<string, Cube[]>> =
        {};

      for (const entry of entires) {
        newMembers = reducer(newMembers, entry);
      }

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