import React, { Fragment, createContext, useContext, useEffect, useRef, useState } from 'react';
import { string } from 'prop-types';

const TabsContext = createContext({});
export const Tabs = ({ initialActiveIndex = 0, id, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  return (
    <TabsContext.Provider value={{ activeIndex, tabsId: id, setActiveIndex }}>
      <div id={id} {...props} />
    </TabsContext.Provider>
  );
};

Tabs.propTypes = { id: string.isRequired };

export const TabList = ({ manual = false, ...props }) => {
  const [focusIndex, setFocusIndex] = useState(-1);

  return (
    <div {...props} role="tablist">
      {React.Children.map(props.children, (child, index) =>
        React.cloneElement(child, {
          count: props.children.length,
          focusIndex,
          index,
          manual,
          setFocusIndex
        })
      )}
    </div>
  );
};

const tabId = (tabsId, index) => `${tabsId}-${index}th-tab`;
const panelId = (tabsId, index) => `${tabsId}-${index}th-panel`;

export const Tab = ({ count, focusIndex, index, manual, setFocusIndex, ...props }) => {
  const ref = useRef(null);
  const mounted = useRef(false);
  const { activeIndex, setActiveIndex, tabsId } = useContext(TabsContext);

  const active = index === activeIndex;
  const focused = focusIndex > -1 ? index === focusIndex : index === activeIndex;

  useEffect(() => {
    if (mounted.current && focused) {
      ref.current.focus();
    }
  }, [activeIndex, focusIndex]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <button
      ref={ref}
      id={tabId(tabsId, index)}
      {...props}
      aria-controls={panelId(tabsId, index)}
      aria-selected={active}
      onClick={() => setActiveIndex(index)}
      onKeyDown={e => {
        const func = manual ? setFocusIndex : setActiveIndex;
        const next = () => func((index + 1) % count);
        const prev = () => func((index - 1 + count) % count);
        switch (e.keyCode) {
          case 35:
            func(count - 1);
            break;
          case 36:
            func(0);
            break;
          case 37:
            prev();
            break;
          case 38:
            prev();
            break;
          case 39:
            next();
            break;
          case 40:
            next();
            break;
          default:
            break;
        }
      }}
      role="tab"
      tabIndex={active - 1}
    />
  );
};

export const TabPanels = ({ children }) => (
  <Fragment>
    {React.Children.map(children, (child, index) => React.cloneElement(child, { index }))}
  </Fragment>
);

export const TabPanel = ({ index, ...props }) => {
  const { activeIndex, tabsId } = useContext(TabsContext);

  const active = index === activeIndex;
  return (
    <div
      id={panelId(tabsId, index)}
      {...props}
      aria-labelledby={tabId(tabsId, index)}
      aria-selected={active}
      role="tabpanel"
      style={{ display: active ? 'inherit' : 'none' }}
      tabIndex={0}
    />
  );
};
