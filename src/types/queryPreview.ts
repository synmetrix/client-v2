import type { Order } from "./order";

export interface QueryPreview {
  measures?: string[];
  dimensions?: string[];
  segments?: string[];
  timeDimensions?: string[];
  order?: Order[];
}
