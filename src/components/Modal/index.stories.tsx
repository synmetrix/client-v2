import { Button } from "antd";

import RootLayout from "@/layouts/RootLayout";

import Modal from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/Modal",
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <RootLayout>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)} closable>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab veritatis
        fuga aliquid pariatur, sapiente modi earum sunt excepturi vel minima
        necessitatibus est aut autem voluptates deserunt quo laborum voluptatum
        officiis.
      </Modal>
    </RootLayout>
  );
};

export const Default = Template.bind({});
