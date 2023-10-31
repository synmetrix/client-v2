import { StepBackwardOutlined } from "@ant-design/icons";

import RootLayout from "@/layouts/RootLayout";

import PopoverButton from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/PopoverButton",
  component: PopoverButton,
} as Meta<typeof PopoverButton>;

const Template: StoryFn<typeof PopoverButton> = (args) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <RootLayout>
      <PopoverButton
        {...args}
        isVisible={isVisible}
        onVisibleChange={setIsVisible}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  trigger: "hover",
  actionText: "test",
  content: <div>testcontent</div>,
};

export const PopConfirm = Template.bind({});

PopConfirm.args = {
  popoverType: "popconfirm",
  trigger: "hover",
  title: "test",
  actionText: "test",
  icon: <StepBackwardOutlined />,
};

export const Dropdown = Template.bind({});

Dropdown.args = {
  popoverType: "dropdown",
  actionText: "test",
  trigger: ["click"],
  menu: {
    items: [
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item
          </a>
        ),
      },
    ],
  },
};
