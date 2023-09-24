// import { useMemo } from "react";
// import { getOr } from "unchanged";

// import fromPairs from "@/utils/helpers/fromPairs";
// import type { Cube, CubeMeta, FilterMember, Metric } from "@/types/cube";
// import { Member } from "@/types/team";

// type PlaygroundState = Record<string, any>;

// const operators = {
//   string: [
//     { name: "contains", title: "contains" },
//     { name: "notContains", title: "does not contain" },
//     { name: "equals", title: "equals" },
//     { name: "notEquals", title: "does not equal" },
//     { name: "set", title: "is set" },
//     { name: "notSet", title: "is not set" },
//   ],
//   number: [
//     { name: "equals", title: "equals" },
//     { name: "notEquals", title: "does not equal" },
//     { name: "set", title: "is set" },
//     { name: "notSet", title: "is not set" },
//     { name: "gt", title: ">" },
//     { name: "gte", title: ">=" },
//     { name: "lt", title: "<" },
//     { name: "lte", title: "<=" },
//   ],
//   time: [
//     { name: "inDateRange", title: "is in range of" },
//     { name: "notInDateRange", title: "is not in range of" },
//     { name: "onTheDate", title: "on the date" },
//     { name: "beforeDate", title: "before date" },
//     { name: "afterDate", title: "after date" },
//     { name: "set", title: "is set" },
//     { name: "notSet", title: "is not set" },
//   ],
// };

// export const granularities = [
//   { name: undefined, title: "Raw" },
//   { name: "second", title: "Second" },
//   { name: "minute", title: "Minute" },
//   { name: "hour", title: "Hour" },
//   { name: "day", title: "Day" },
//   { name: "week", title: "Week" },
//   { name: "month", title: "Month" },
//   { name: "quarter", title: "Quarter" },
//   { name: "year", title: "Year" },
// ];

// const memberMap = (memberArray: any[]) =>
//   fromPairs(memberArray.map((m) => [m.name, m]));

// class Meta implements CubeMeta {
//   constructor(cubesMap: any) {
//     this.cubesMap = cubesMap || {};
//   }
//   cubesMap: Record<string, Cube>;
//   name: string = "";
//   measures?: { type: string; name: string }[] | undefined;
//   dimensions?: { type: string; name: string }[] | undefined;
//   segments?: { type: string; name: string }[] | undefined;
//   category?: string | undefined;
//   index?: number | undefined;
//   selectedIndex?: number | undefined;
//   lastClickedMember?: any;
//   hovered?: any;

//   getCubeMembers(memberName: string, memberType: string): Partial<Metric> {
//     const [cube] = memberName.split(".");

//     if (!this.cubesMap[cube]) {
//       return {};
//     }

//     return this.cubesMap[cube][memberType as keyof Cube] || {};
//   }

//   resolveMember(memberName: string, memberType: string | string[]) {
//     const [cube] = memberName.split(".");

//     if (!this.cubesMap[cube]) {
//       return {
//         title: memberName,
//         error: `Cube not found ${cube} for path '${memberName}'`,
//       };
//     }

//     const memberTypes = Array.isArray(memberType) ? memberType : [memberType];

//     const member = memberTypes
//       .map(
//         (type) =>
//           this.getCubeMembers(cube, type) &&
//           this.getCubeMembers(cube, type)[memberName as keyof Metric]
//       )
//       .find((m) => m);

//     if (!member) {
//       return { title: memberName, error: `Path not found '${memberName}'` };
//     }

//     return member as Metric;
//   }

//   filterOperatorsForMember(memberName: string, memberType: string[]) {
//     const member = this.resolveMember(memberName, memberType);
//     return "error" in member
//       ? operators[(member as unknown as Metric).type as keyof typeof operators]
//       : operators.string;
//   }
// }

// const enrichPlaygroundMembers = (
//   cubesMetaCls: Meta,
//   playgroundState: PlaygroundState
// ) => {
//   const resolveWithIndex = (key: string) =>
//     getOr([], key, playgroundState).map((value: string, index: number) => ({
//       index,
//       ...cubesMetaCls.resolveMember(value, key),
//     }));

//   const timeDimensions: Metric[] = getOr(
//     [],
//     "timeDimensions",
//     playgroundState
//   ).map((m: Cube, index: number) => ({
//     ...m,
//     ...cubesMetaCls.resolveMember(m.dimension.name, "dimensions"),
//     name: m.granularity ? `${m.dimension}+${m.granularity}` : m.dimension,
//     index,
//   }));

//   const filters: FilterMember = getOr([], "filters", playgroundState).map(
//     (m: Cube, index: number) => ({
//       ...m,
//       dimension: cubesMetaCls.resolveMember(m.dimension.name, [
//         "dimensions",
//         "measures",
//       ]),
//       operators: cubesMetaCls.filterOperatorsForMember(m.dimension.name, [
//         "dimensions",
//         "measures",
//       ]),
//       index,
//     })
//   );

//   const enrichedMembers = {
//     measures: resolveWithIndex("measures"),
//     dimensions: resolveWithIndex("dimensions")
//       .filter(
//         (m: Cube) => m.type !== "time" || (m.type === "time" && !m.granularity)
//       )
//       .concat(timeDimensions),
//     segments: resolveWithIndex("segments"),
//     timeDimensions,
//     filters,
//   };

//   return enrichedMembers;
// };

// const updatePlaygroundState = (
//   playgroundState: PlaygroundState,
//   cubesMeta: Meta
// ) => {
//   const keys = ["dimensions", "measures", "segments", "filters"];

//   const updatedPlaygroundState = Object.keys(playgroundState).reduce(
//     (acc, curKey) => {
//       if (keys.find((key) => key === curKey)) {
//         const filteredArray = playgroundState[curKey].filter((m: Cube) => {
//           let resolved: any = false;

//           if (curKey === "filters") {
//             resolved = cubesMeta.resolveMember(m.dimension.name, [
//               "dimensions",
//               "measures",
//             ]);
//           } else {
//             resolved = cubesMeta.resolveMember(m.name, curKey);
//           }

//           if (!resolved.error) {
//             return true;
//           }
//         });

//         return {
//           ...acc,
//           [curKey]: filteredArray,
//         };
//       }

//       return {
//         ...acc,
//         [curKey]: playgroundState[curKey],
//       };
//     },
//     {}
//   );

//   return updatedPlaygroundState;
// };

// export default ({
//   meta = [],
//   playgroundState,
// }: {
//   meta: Meta[];
//   playgroundState: PlaygroundState;
// }) => {
//   const result = useMemo(() => {
//     if (!meta) {
//       return {};
//     }
//     const cubesPairs = (meta || []).map((c: Meta) => [
//       c.name,
//       {
//         measures: memberMap(c.measures!),
//         dimensions: memberMap(c.dimensions!),
//         segments: memberMap(c.segments!),
//         timeDimensions: memberMap(
//           c.dimensions!.filter((d) => d.type === "time")
//         ),
//       },
//     ]);
//     const cubesMap = fromPairs(Object.entries(cubesPairs));

//     const cubesMeta = new Meta(cubesMap);
//     const updatedPlaygroundState = updatePlaygroundState(
//       playgroundState,
//       cubesMeta
//     );

//     return {
//       selectedQueryMembers: enrichPlaygroundMembers(
//         cubesMeta,
//         updatedPlaygroundState
//       ),
//       availableQueryMembers: cubesMap,
//     };
//   }, [meta, playgroundState]);

//   return result;
// };

//@ts-nocheck

import { useMemo } from "react";
import { getOr } from "unchanged";

import fromPairs from "@/utils/helpers/fromPairs";

const operators = {
  string: [
    { name: "contains", title: "contains" },
    { name: "notContains", title: "does not contain" },
    { name: "equals", title: "equals" },
    { name: "notEquals", title: "does not equal" },
    { name: "set", title: "is set" },
    { name: "notSet", title: "is not set" },
  ],
  number: [
    { name: "equals", title: "equals" },
    { name: "notEquals", title: "does not equal" },
    { name: "set", title: "is set" },
    { name: "notSet", title: "is not set" },
    { name: "gt", title: ">" },
    { name: "gte", title: ">=" },
    { name: "lt", title: "<" },
    { name: "lte", title: "<=" },
  ],
  time: [
    { name: "inDateRange", title: "is in range of" },
    { name: "notInDateRange", title: "is not in range of" },
    { name: "onTheDate", title: "on the date" },
    { name: "beforeDate", title: "before date" },
    { name: "afterDate", title: "after date" },
    { name: "set", title: "is set" },
    { name: "notSet", title: "is not set" },
  ],
};

export const granularities = [
  { name: undefined, title: "Raw" },
  { name: "second", title: "Second" },
  { name: "minute", title: "Minute" },
  { name: "hour", title: "Hour" },
  { name: "day", title: "Day" },
  { name: "week", title: "Week" },
  { name: "month", title: "Month" },
  { name: "quarter", title: "Quarter" },
  { name: "year", title: "Year" },
];

const memberMap = (memberArray) =>
  fromPairs(memberArray.map((m) => [m.name, m]));

class Meta {
  constructor(cubesMap) {
    this.cubesMap = cubesMap || {};
  }

  getCubeMembers(memberName, memberType) {
    const [cube] = memberName.split(".");

    if (!this.cubesMap[cube]) {
      return {};
    }

    return this.cubesMap[cube][memberType] || {};
  }

  resolveMember(memberName, memberType) {
    const [cube] = memberName.split(".");

    if (!this.cubesMap[cube]) {
      return {
        title: memberName,
        error: `Cube not found ${cube} for path '${memberName}'`,
      };
    }

    const memberTypes = Array.isArray(memberType) ? memberType : [memberType];

    const member = memberTypes
      .map(
        (type) =>
          this.getCubeMembers(cube, type) &&
          this.getCubeMembers(cube, type)[memberName]
      )
      .find((m) => m);

    if (!member) {
      return { title: memberName, error: `Path not found '${memberName}'` };
    }

    return member;
  }

  filterOperatorsForMember(memberName, memberType) {
    const member = this.resolveMember(memberName, memberType);
    return operators[member.type] || operators.string;
  }
}

const enrichPlaygroundMembers = (cubesMetaCls, playgroundState) => {
  const resolveWithIndex = (key) =>
    getOr([], key, playgroundState).map((value, index) => ({
      index,
      ...cubesMetaCls.resolveMember(value, key),
    }));

  const timeDimensions = getOr([], "timeDimensions", playgroundState).map(
    (m, index) => ({
      ...m,
      ...cubesMetaCls.resolveMember(m.dimension, "dimensions"),
      name: m.granularity ? `${m.dimension}+${m.granularity}` : m.dimension,
      index,
    })
  );

  const filters = getOr([], "filters", playgroundState).map((m, index) => ({
    ...m,
    dimension: cubesMetaCls.resolveMember(m.dimension, [
      "dimensions",
      "measures",
    ]),
    operators: cubesMetaCls.filterOperatorsForMember(m.dimension, [
      "dimensions",
      "measures",
    ]),
    index,
  }));

  const enrichedMembers = {
    measures: resolveWithIndex("measures"),
    dimensions: resolveWithIndex("dimensions")
      .filter((m) => m.type !== "time" || (m.type === "time" && !m.granularity))
      .concat(timeDimensions),
    segments: resolveWithIndex("segments"),
    timeDimensions,
    filters,
  };

  return enrichedMembers;
};

const updatePlaygroundState = (playgroundState, cubesMeta) => {
  const keys = ["dimensions", "measures", "segments", "filters"];

  const updatedPlaygroundState = Object.keys(playgroundState).reduce(
    (acc, curKey) => {
      if (keys.find((key) => key === curKey)) {
        const filteredArray = playgroundState[curKey].filter((m) => {
          let resolved = false;

          if (curKey === "filters") {
            resolved = cubesMeta.resolveMember(m.dimension, [
              "dimensions",
              "measures",
            ]);
          } else {
            resolved = cubesMeta.resolveMember(m, curKey);
          }

          if (!resolved.error) {
            return true;
          }
        });

        return {
          ...acc,
          [curKey]: filteredArray,
        };
      }

      return {
        ...acc,
        [curKey]: playgroundState[curKey],
      };
    },
    {}
  );

  return updatedPlaygroundState;
};

export default ({ meta = [], playgroundState }) => {
  const result = useMemo(() => {
    if (!meta) {
      return {};
    }
    const cubesPairs = (meta || []).map((c) => [
      c.name,
      {
        measures: memberMap(c.measures),
        dimensions: memberMap(c.dimensions),
        segments: memberMap(c.segments),
        timeDimensions: memberMap(
          c.dimensions.filter((d) => d.type === "time")
        ),
      },
    ]);
    const cubesMap = fromPairs(cubesPairs);

    const cubesMeta = new Meta(cubesMap);
    const updatedPlaygroundState = updatePlaygroundState(
      playgroundState,
      cubesMeta
    );

    return {
      selectedQueryMembers: enrichPlaygroundMembers(
        cubesMeta,
        updatedPlaygroundState
      ),
      availableQueryMembers: cubesMap,
    };
  }, [meta, playgroundState]);

  return result;
};
