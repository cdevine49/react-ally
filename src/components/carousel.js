import React, { useState } from 'react';

export const ToggleRotationButton = ({ disabled }) => {
  const [focused, setFocused] = useState(false);
  return (
    <button
      aria-disabled={disabled}
      onClick={() => setRotating(rotating => !rotating)}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      style={
        focused
          ? {}
          : {
              position: 'absolute',
              left: '-10000px',
              top: 'auto',
              width: '1px',
              height: '1px',
              overflow: 'hidden'
            }
      }
    >
      {`${rotating ? 'Stop' : 'Start'} automatic slide show`}
    </button>
  );
};

export const Carousel = ({
  autoRotate = false,
  children: slides,
  id,
  nextLabel = 'Next Slide',
  previousLabel = 'Previous Slide',
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rotating, setRotating] = useState(autoRotate);

  const count = slides.length;
  const next = () => setActiveIndex(prevIndex => (prevIndex + 1) % count);
  const prev = () => setActiveIndex(prevIndex => (prevIndex - 1 + count) % count);
  return (
    <div id={id} aria-roledescription="carousel">
      <ToggleRotationButton disabled={paused} />
      <div
        aria-atomic={false}
        aria-live={rotating ? 'off' : 'polite'}
        onBlur={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button aria-controls={id} aria-label={previousLabel} onClick={prev} />
        {React.Children.map(slides, (slide, index) => React.cloneElement(slide, { count, index }))}
        <button aria-controls={id} aria-label={nextLabel} onClick={next} />
      </div>
    </div>
  );
};
