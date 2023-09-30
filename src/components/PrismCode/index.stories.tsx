import RootLayout from "@/layouts/RootLayout";

import PrismCode from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/PrismCode",
  component: PrismCode,
} as Meta<typeof PrismCode>;

const Template: StoryFn<typeof PrismCode> = (args) => (
  <RootLayout>
    <PrismCode {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  lang: "sql",
  code: `//one line comment
  /* 
   * multiline 
   * comments
   */
  SELECT Book.title 
   FROM Book
   JOIN Book_author ON Book.isbn = Book_author.isbn
   GROUP BY Book.title
  HAVING Book.price > 10.4 AND Book_author.name = "Frank"
  ORDER BY No_of_Authors ; -- another comment style`,
};
