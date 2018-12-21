import React from "react";
import { cleanup, fireEvent, render } from "react-testing-library";
import {
  Dialog,
  DialogContent,
  DialogOpenButton,
  DialogCloseButton,
  LeastDangerousElement,
  FirstTabbableElement,
  DialogLabel,
  DialogDescription,
  LastTabbableElement
} from "../components/dialog";
import { needsDialogLabel, needsDialogDescription } from "../errors";

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

test("default", () => {
  const component = (
    <Dialog>
      <DialogOpenButton>Open Me</DialogOpenButton>
      <DialogContent>
        <DialogLabel id="label-id">Content</DialogLabel>
      </DialogContent>
    </Dialog>
  );
  const { asFragment, unmount } = render(component, { container: document.body });
  expect(asFragment()).toMatchSnapshot();

  unmount();
});

test("initializeOpen prop", () => {
  const component = (
    <Dialog initializeOpen>
      <DialogOpenButton>Open Me</DialogOpenButton>
      <DialogContent>
        <DialogLabel id="label-id">Content</DialogLabel>
      </DialogContent>
    </Dialog>
  );
  const { asFragment, unmount } = render(component, { container: document.body });
  expect(asFragment()).toMatchSnapshot();

  unmount();
});

test("Dialog ignores children besides DialogOpenButton and DialogContent", () => {
  const component = (
    <Dialog initializeOpen>
      <div>Hello</div>
      <button>World</button>
    </Dialog>
  );
  const { asFragment, unmount } = render(component, { container: document.body });
  expect(asFragment()).toMatchSnapshot();

  unmount();
});

describe(`Opening a dialog`, () => {
  test("Clicking DialogOpenButton", () => {
    const component = (
      <Dialog>
        <DialogOpenButton>Open Me</DialogOpenButton>
        <DialogContent>
          <DialogLabel id="label-id">Content</DialogLabel>
        </DialogContent>
      </Dialog>
    );
    const { asFragment, getByText, unmount } = render(component, { container: document.body });

    fireEvent.click(getByText("Open Me"));

    expect(asFragment()).toMatchSnapshot();
    unmount();
  });

  test(`Focus goes to LeastDangerousElement`, () => {
    const onFocusFirstTabbable = jest.fn();
    const onFocusLeastDangerous = jest.fn();
    const onBlurLeastDangerous = jest.fn();
    const component = (
      <Dialog>
        <DialogOpenButton>Open Me</DialogOpenButton>
        <DialogContent>
          <DialogLabel id="label-id">Header</DialogLabel>
          <FirstTabbableElement>
            <button onFocus={onFocusFirstTabbable}>First Tabbable</button>
          </FirstTabbableElement>
          <LeastDangerousElement>
            <button onFocus={onFocusLeastDangerous} onBlur={onBlurLeastDangerous}>
              Least Dangerous
            </button>
          </LeastDangerousElement>
        </DialogContent>
      </Dialog>
    );
    const { getByText, rerender, unmount } = render(component, { container: document.body });
    fireEvent.click(getByText("Open Me"));
    rerender(component);

    expect(onFocusFirstTabbable).not.toHaveBeenCalled();
    expect(onFocusLeastDangerous).toHaveBeenCalled();
    expect(onBlurLeastDangerous).not.toHaveBeenCalled();

    unmount();
  });

  test(`Focus goes to FirstTabbableElement if no LeastDangerousElement`, () => {
    const onFocusFirstTabbable = jest.fn();
    const onFocusOther = jest.fn();
    const onBlurFirstTabbable = jest.fn();
    const component = (
      <Dialog>
        <DialogOpenButton>Open Me</DialogOpenButton>
        <DialogContent>
          <DialogLabel id="label-id">Header</DialogLabel>
          <button onFocus={onFocusOther}>I dont receive focus</button>
          <FirstTabbableElement>
            <button onFocus={onFocusFirstTabbable} onBlur={onBlurFirstTabbable}>
              First Tabbable
            </button>
          </FirstTabbableElement>
          <button onFocus={onFocusOther}>I dont receive focus</button>
        </DialogContent>
      </Dialog>
    );
    const { getByText, rerender, unmount } = render(component, { container: document.body });
    fireEvent.click(getByText("Open Me"));
    rerender(component);

    expect(onFocusFirstTabbable).toHaveBeenCalled();
    expect(onBlurFirstTabbable).not.toHaveBeenCalled();
    expect(onFocusOther).not.toHaveBeenCalled();

    unmount();
  });

  test(`Sets modalRoot's siblings to aria-hidden`, () => {
    const component = (
      <div>
        <Dialog>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent>
            <DialogLabel id="label-id">Content</DialogLabel>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, getByText, rerender, unmount } = render(component, { container: document.body });
    const sibling = document.createElement("div");
    document.body.appendChild(sibling);
    const hiddenSibling = document.createElement("div");
    hiddenSibling.setAttribute("aria-hidden", true);
    document.body.appendChild(hiddenSibling);
    fireEvent.click(getByText("Open Me"));
    rerender(component);
    expect(asFragment()).toMatchSnapshot();

    unmount();
  });
});

describe("Closing the dialog", () => {
  test("Clicking DialogCloseButton", () => {
    const component = (
      <div>
        <Dialog initializeOpen>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent>
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogCloseButton>Close Me</DialogCloseButton>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, getByText, rerender, unmount } = render(component, { container: document.body });

    fireEvent.click(getByText("Close Me"));
    rerender(component);

    expect(asFragment()).toMatchSnapshot();
    unmount();
  });

  test("Click the overlay", () => {
    const component = (
      <div>
        <Dialog initializeOpen>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent overlayProps={{ "data-testid": "dialog-overlay" }}>
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogCloseButton>Close Me</DialogCloseButton>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, getByTestId, rerender, unmount } = render(component, { container: document.body });

    fireEvent.click(getByTestId("dialog-overlay"));
    rerender(component);

    expect(asFragment()).toMatchSnapshot();
    unmount();
  });

  test("Click the dialog", () => {
    const component = (
      <div>
        <Dialog initializeOpen>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent data-testid="dialog">
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogCloseButton>Close Me</DialogCloseButton>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, getByTestId, rerender, unmount } = render(component, { container: document.body });

    fireEvent.click(getByTestId("dialog"));
    rerender(component);

    expect(asFragment()).toMatchSnapshot();
    unmount();
  });

  test("Escape key", () => {
    const component = (
      <div>
        <Dialog initializeOpen>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent>
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogCloseButton>Close Me</DialogCloseButton>
            <button>Focus Me</button>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, getByText, rerender, unmount } = render(component, { container: document.body });

    fireEvent.click(getByText("Focus Me"));
    rerender(component);
    fireEvent.keyDown(getByText("Focus Me"), {
      key: "Escape",
      keyCode: 27
    });
    rerender(component);

    expect(asFragment()).toMatchSnapshot();
    unmount();
  });

  test("Focus returns to open button", () => {
    const onFocusOpenButton = jest.fn();
    const onBlurOpenButton = jest.fn();
    const component = (
      <Dialog initializeOpen>
        <DialogOpenButton onFocus={onFocusOpenButton} onBlur={onBlurOpenButton}>
          Open Me
        </DialogOpenButton>
        <DialogContent>
          <DialogLabel id="label-id">Header</DialogLabel>
          <DialogCloseButton>Close Me</DialogCloseButton>
        </DialogContent>
      </Dialog>
    );
    const { getByText, rerender, unmount } = render(component, { container: document.body });
    fireEvent.click(getByText("Close Me"));
    rerender(component);

    expect(onFocusOpenButton).toHaveBeenCalled();
    expect(onBlurOpenButton).not.toHaveBeenCalled();

    unmount();
  });

  test("ModalRoot siblings return to original aria-hidden states", () => {
    const component = (
      <div>
        <Dialog initializeOpen>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent>
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogCloseButton>Close Me</DialogCloseButton>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, getByText, rerender, unmount } = render(component, { container: document.body });

    const sibling = document.createElement("div");
    document.body.appendChild(sibling);
    const hiddenSibling = document.createElement("div");
    hiddenSibling.setAttribute("aria-hidden", true);
    document.body.appendChild(hiddenSibling);

    rerender(component);
    fireEvent.click(getByText("Close Me"));
    rerender(component);

    expect(asFragment()).toMatchSnapshot();

    unmount();
  });
});

describe("DialogContent", () => {
  test("expects a DialogLabel child", () => {
    const component = <DialogContent>Content</DialogContent>;
    render(component);
    expect(console.error).toHaveBeenCalledWith(`Warning: Failed prop type: ${needsDialogLabel("DialogContent")}
    in DialogContent`);
  });

  test(`aria-labelledby DialogLabel's id`, () => {
    const component = (
      <DialogContent>
        <DialogLabel id="header-id" />
      </DialogContent>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`aria-describedby DialogDescription's id`, () => {
    const component = (
      <DialogContent>
        <DialogLabel id="header-id" />
        <DialogDescription id="description-id" />
      </DialogContent>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("DialogLabel", () => {
  test("id is required", () => {
    const component = <DialogLabel />;
    render(component);
    expect(console.error)
      .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`id\` is marked as required in \`DialogLabel\`, but its value is \`undefined\`.
    in DialogLabel`);
  });
});

describe("DialogDescription", () => {
  test("id is required", () => {
    const component = <DialogDescription />;
    render(component);
    expect(console.error)
      .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`id\` is marked as required in \`DialogDescription\`, but its value is \`undefined\`.
    in DialogDescription`);
  });
});

describe("AlertDialog", () => {
  test("DialogDescription is required", () => {
    const component = (
      <div>
        <Dialog>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent role="alertdialog">
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogCloseButton>Close Me</DialogCloseButton>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { unmount } = render(component);

    expect(console.error).toHaveBeenCalledWith(`Warning: Failed prop type: ${needsDialogDescription("DialogContent")}
    in DialogContent`);

    unmount();
  });

  test(`has correct role`, () => {
    const component = (
      <div>
        <Dialog initializeOpen>
          <DialogOpenButton>Open Me</DialogOpenButton>
          <DialogContent role="alertdialog">
            <DialogLabel id="label-id">Header</DialogLabel>
            <DialogDescription id="alert-desc">Don't Delete That Just Yet</DialogDescription>
            <DialogCloseButton>Close Me</DialogCloseButton>
          </DialogContent>
        </Dialog>
      </div>
    );
    const { asFragment, unmount } = render(component, { container: document.body });

    expect(asFragment()).toMatchSnapshot();

    unmount();
  });
});

test("Nested Dialog Modals", () => {
  const component = (
    <div>
      <Dialog>
        <DialogOpenButton>Open First</DialogOpenButton>
        <DialogContent>
          <DialogLabel id="label-id">First Header</DialogLabel>
          <Dialog>
            <DialogOpenButton>Open Second</DialogOpenButton>
            <DialogContent>
              <DialogLabel id="label-id">Second Header</DialogLabel>
              <DialogCloseButton>Close Second</DialogCloseButton>
            </DialogContent>
          </Dialog>
          <DialogCloseButton>Close First</DialogCloseButton>
        </DialogContent>
      </Dialog>
    </div>
  );

  const { asFragment, getByText, rerender, unmount } = render(component, { container: document.body });

  expect(asFragment()).toMatchSnapshot();

  fireEvent.click(getByText("Open First"));
  rerender(component);

  expect(asFragment()).toMatchSnapshot();

  fireEvent.click(getByText("Open Second"));
  rerender(component);

  expect(asFragment()).toMatchSnapshot();

  unmount();
});
