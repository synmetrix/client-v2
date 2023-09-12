import { getOr } from "unchanged";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import type { FC, MouseEvent, MouseEventHandler } from "react";
import type { LinkProps } from "react-router-dom";

const MenuView: FC<MenuViewProps> = ({
  nodes,
  mode = "horizontal",
  ...restProps
}) => {
  const getLink = (node: Node) => {
    const onClick: MouseEventHandler<HTMLAnchorElement> = (e) =>
      node.onClick?.(node, e);

    const linkProps: LinkProps = {
      to: node.path || "",
      onClick,
    };

    return <Link {...linkProps}>{node.title}</Link>;
  };

  const renderNode = (node: Node) => {
    const children = getOr([], "children", node);

    if (children instanceof Array) {
      if (children.length > 0)
        return (
          <Menu.SubMenu key={node.key || node.title} title={node.title}>
            {children.map(renderNode)}
          </Menu.SubMenu>
        );
    }

    return <Menu.Item key={node.key || node.title}>{getLink(node)}</Menu.Item>;
  };

  return (
    <Menu mode={mode} {...restProps}>
      {nodes.map(renderNode)}
    </Menu>
  );
};

interface Node {
  title: string;
  key?: string;
  path?: string;
  children?: Node[];
  onClick?: (node: Node, event?: MouseEvent<HTMLAnchorElement>) => void;
}

interface MenuViewProps {
  nodes: Node[];
  mode?: "horizontal" | "vertical" | "inline";
  className?: string;
  style?: object;
}

export default MenuView;
