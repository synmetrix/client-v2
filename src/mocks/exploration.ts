export const SAMPLE_EXPLORATION = {
  id: "f812c3ec-84c6-4923-998c-7d673fc31d2d",
  playground_state: {
    page: 0,
    limit: 20,
    order: [
      {
        id: "GithubEvents.action",
        desc: true,
      },
    ],
    offset: 0,
    filters: [
      {
        values: "2022-06-01",
        operator: "afterDate",
        dimension: "GithubEvents.action",
      },
    ],
    measures: ["GithubEvents.count"],
    segments: [],
    timezone: "UTC",
    dimensions: [],
    timeDimensions: [
      {
        dimension: "GithubEvents.action",
        granularity: "month",
      },
    ],
  },
};
