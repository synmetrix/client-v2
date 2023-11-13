import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Button } from "antd";

describe("Testing a button component", () => {
  describe("Testing Basic Behavior", () => {
    const buttonTestId = "button_displaying_children";
    const onClick = vi.fn();
    let button: HTMLElement;

    beforeEach(() => {
      render(
        <Button data-testid={buttonTestId} onClick={onClick}>
          Action
        </Button>
      );
      button = screen.getByTestId(buttonTestId);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("Сhildren display", () => {
      expect(button.textContent).toBe("Action");
    });

    test("Click event trigger onClick function", async () => {
      await userEvent.click(button);
      expect(onClick).toBeCalled();
    });
  });
});
