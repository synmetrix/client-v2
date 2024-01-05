import { Dropdown, Popconfirm, Popover } from "antd";

import Button from "@/components/Button";

import type {
  PopoverProps,
  ButtonProps,
  PopconfirmProps,
  DropdownProps,
} from "antd";
import type { FC, MouseEvent, ReactNode } from "react";

type PopoverButtonProps = (PopoverProps | DropdownProps | PopconfirmProps) & {
  popoverType?: "popconfirm" | "dropdown";
  icon?: ReactNode | null;
  actionText?: string | null;
  defaultVisible?: boolean;
  isVisible?: boolean;
  onVisibleChange?: (isVisible: boolean) => void;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  buttonProps?: ButtonProps;
};

const PopoverButton: FC<PopoverButtonProps> = ({
  popoverType,
  icon = null,
  actionText = null,
  isVisible = null,
  defaultVisible,
  disabled = false,
  onVisibleChange,
  onClick,
  buttonProps,
  ...restProps
}) => {
  const [visibleState, setVisible] = useState<boolean>(!!defaultVisible);

  useEffect(() => {
    if (isVisible !== null && isVisible !== visibleState) {
      setVisible(!!isVisible);
    }
  }, [isVisible, visibleState]);

  const stopPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onVisChange = (vis: boolean) => {
    if (!disabled) {
      setVisible(vis);
      onVisibleChange?.(vis);
    }
  };

  const actionButton = (
    <Button
      size="small"
      disabled={disabled}
      style={{ display: "flex", alignItems: "center" }}
      onClick={(e) => {
        stopPropagation(e);
        onClick?.(e);
      }}
      {...buttonProps}
    >
      <span>
        {icon}
        {actionText || null}
      </span>
    </Button>
  );

  if (popoverType === "popconfirm") {
    return (
      <Popconfirm
        {...(restProps as PopconfirmProps)}
        open={visibleState}
        onOpenChange={onVisChange}
      >
        {actionButton}
      </Popconfirm>
    );
  }

  if (popoverType === "dropdown") {
    return (
      <Dropdown
        {...(restProps as DropdownProps)}
        disabled={disabled}
        onOpenChange={onVisChange}
      >
        {actionButton}
      </Dropdown>
    );
  }

  return (
    <div style={{ display: "inline-block" }} onClick={stopPropagation}>
      <Popover
        {...(restProps as PopoverProps)}
        open={visibleState}
        onOpenChange={onVisChange}
      >
        {actionButton}
      </Popover>
    </div>
  );
};

export default PopoverButton;
