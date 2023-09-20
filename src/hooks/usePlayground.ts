export const getTitle = (
  settings: { hideCubeNames?: boolean },
  column: { shortTitle: string; title: string }
) => (settings.hideCubeNames ? column.shortTitle : column.title);
