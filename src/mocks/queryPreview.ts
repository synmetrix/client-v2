export const queryPreviewMock = {
  measures: ["Actors.count"],
  dimensions: ["Actors.type"],
  timeDimensions: [{ dimension: "Actors.createdAt", granularity: "day" }],
  segments: [],
  order: { "emptyCube.emptyKey": "asc" },
};
