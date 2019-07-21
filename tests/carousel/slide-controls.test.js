import React, { useState } from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { NextSlideControl, PreviousSlideControl } from '../../src/carousel/';
import * as context from '../../src/carousel/context';

afterEach(cleanup);

const components = {
  NextSlideControl,
  PreviousSlideControl
};

const text = currentIndex => `Current Index: ${currentIndex}`;
const slide = index => `
<DocumentFragment>
  <button>
    ${text(index)}
  </button>
</DocumentFragment>
`;

const setNumberOfSlides = slides_count =>
  jest.spyOn(context, 'useCarouselContext').mockImplementation(() => ({
    slides_count
  }));

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

const setupRender = Component => {
  const Wrapper = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    return <Component setCurrentIndex={setCurrentIndex}>{text(currentIndex)}</Component>;
  };
  return render(<Wrapper />);
};

const OneSlide = Component => {
  test('clicking when only one slide', () => {
    setNumberOfSlides(1);
    const { asFragment, getByText } = setupRender(Component);

    [0, 0, 0].forEach(number => {
      expect(asFragment()).toMatchInlineSnapshot(slide(number));
      fireEvent.click(getByText(text(number)));
    });
  });
};

describe('Next Slide Control', () => {
  MissingRequiredPropsText('NextSlideControl');
  OneSlide(NextSlideControl);
  test('clicking when three slides', () => {
    setNumberOfSlides(3);
    const { asFragment, getByText } = setupRender(NextSlideControl);

    for (let i = 0; i < 2; i++) {
      fireEvent.click(getByText(text(i)));
      expect(asFragment()).toMatchInlineSnapshot(slide(i + 1));
    }
    fireEvent.click(getByText(text(2)));
    expect(asFragment()).toMatchInlineSnapshot(slide(0));
  });
});

describe('Previous Slide Control', () => {
  MissingRequiredPropsText('PreviousSlideControl');
  OneSlide(PreviousSlideControl);
  test('clicking when three slides', () => {
    setNumberOfSlides(3);
    const { asFragment, getByText } = setupRender(PreviousSlideControl);

    fireEvent.click(getByText(text(0)));
    expect(asFragment()).toMatchInlineSnapshot(slide(2));
    for (let i = 2; i < 0; i++) {
      fireEvent.click(getByText(text(i)));
      expect(asFragment()).toMatchInlineSnapshot(slide(i - 1));
    }
  });
});
