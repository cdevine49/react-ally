import { createContext, useContext } from 'react';

export const useCarouselContext = () => useContext(CarouselContext);

export const CarouselContext = createContext({});
