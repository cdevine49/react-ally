import React, { useContext } from 'react';
import { SlidesCountContext } from './context';
import { func } from 'prop-types';

const SlideControl = ({ setCurrentIndex, incrementing }) => {
  if (!setCurrentIndex) {
    return null;
  }
  const slides_count = useContext(SlidesCountContext);
  const onClick = incrementing
    ? setCurrentIndex(ci => (ci + 1) % slides_count)
    : setCurrentIndex(ci => (ci - 1 + slides_count) % slides_count);
  return <button {...props} onClick={onClick} />;
};

export const NextSlideControl = props => <SlideControl incrementing {...props} />;
export const PreviousSlideControl = props => <SlideControl incrementing={false} {...props} />;

const sharedProps = { setCurrentIndex: func.isRequired };

NextSlideControl.propTypes = sharedProps;
PreviousSlideControl.propTypes = sharedProps;
