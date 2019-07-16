import React, { createContext } from 'react';
import { cleanup, render } from 'react-testing-library';
import { NextSlideControl, PreviousSlideControl } from '../../es/react-ally';

afterEach(cleanup);

let realUseContext, mockUseContext;
beforeEach(() => {
  realUseContext = React.useContext;
  mockUseContext = React.useContext = jest.fn();
});

afterEach(() => {
  React.useContext = realUseContext;
});

const components = {
  NextSlideControl,
  PreviousSlideControl
};

const MissingRequiredPropsText = ComponentName => {
  test('missing required props', () => {
    console.error = jest.fn();
    const Component = components[ComponentName];
    render(<Component />);
    const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`${ComponentName}\`, but its value is \`undefined\`.
    in ${ComponentName}`;
    expect(console.error).toHaveBeenCalledWith(message('setCurrentIndex'));
    expect(console.error).toHaveBeenCalledTimes(1);
  });
};

describe('Next Slide Control', () => {
  MissingRequiredPropsText('NextSlideControl');

  test('one slide', () => {
    mockUseContext.mockReturnValue(1);
    const { getByText } = render(<NextSlideControl>Hello World</NextSlideControl>);
  });
});

describe('Previous Slide Control', () => {
  MissingRequiredPropsText('PreviousSlideControl');
});
