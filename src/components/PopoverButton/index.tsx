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
  onVisibleChange?: (isVisible: boolean) => void;
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  buttonProps?: ButtonProps;
};

const PopoverButton: FC<PopoverButtonProps> = ({
  popoverType,
  icon = null,
  actionText = null,
  visible,
  defaultVisible,
  disabled = false,
  onVisibleChange,
  onClick,
  buttonProps,
  ...restProps
}) => {
  const [visibleState, setVisible] = useState<boolean>(!!defaultVisible);

  useEffect(() => {
    if (visible !== null && visible !== visibleState) {
      setVisible(!!visible);
    }
  }, [visible, visibleState]);

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
      onClick={(e) => {
        stopPropagation(e);
        onClick?.(e);
      }}
      {...buttonProps}
    >
      {icon}
      {actionText || null}
    </Button>
  );

  if (popoverType === "popconfirm") {
    return (
      <Popconfirm
        open={visibleState}
        onOpenChange={onVisChange}
        {...(restProps as PopconfirmProps)}
      >
        {actionButton}
      </Popconfirm>
    );
  }

  if (popoverType === "dropdown") {
    return (
      <Dropdown
        open={visibleState}
        onOpenChange={onVisChange}
        {...(restProps as DropdownProps)}
      >
        {actionButton}
      </Dropdown>
    );
  }

  return (
    <div onClick={stopPropagation}>
      <Popover
        popupVisible={visibleState}
        onOpenChange={onVisChange}
        {...(restProps as PopoverProps)}
      >
        {actionButton}
      </Popover>
    </div>
  );
};

export default PopoverButton;
