import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { LiveRegion, Alert, Status, Log, Progressbar, Marquee, Timer } from '../es/react-ally.js';
import { useSpecializedRole, invalidAriaRelevant, blacklisted, zeroToOne } from '../src/errors';

afterEach(cleanup);

describe('Live Region', () => {
  test('defaults', () => {
    const { asFragment } = render(<LiveRegion />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('aria defaults can be overridden', () => {
    const component = <LiveRegion aria-atomic={false} aria-live="assertive" aria-relevant="all" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('spreads other props including children', () => {
    const component = (
      <LiveRegion id="my-live-region" className="my-live-region-class">
        Hello World
      </LiveRegion>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`logs errors for invalid props`, () => {
    console.error = jest.fn();
    const component = <LiveRegion aria-atomic={1} aria-live="loud" aria-relevant="additions bad text" role="alert" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaAtomicError = `Warning: Failed prop type: Invalid prop \`aria-atomic\` of type \`number\` supplied to \`LiveRegion\`, expected \`boolean\`.
    in LiveRegion`;
    const ariaLiveError = `Warning: Failed prop type: Invalid prop \`aria-live\` of value \`loud\` supplied to \`LiveRegion\`, expected one of ["off","polite","assertive"].
    in LiveRegion`;
    const ariaRelevantError = `Warning: Failed prop type: ${invalidAriaRelevant('bad', 'aria-relevant', 'LiveRegion')}
    in LiveRegion`;
    const roleError = `Warning: Failed prop type: ${useSpecializedRole('role', 'LiveRegion')}
    in LiveRegion`;

    expect(console.error).toHaveBeenCalledWith(ariaAtomicError);
    expect(console.error).toHaveBeenCalledWith(ariaLiveError);
    expect(console.error).toHaveBeenCalledWith(ariaRelevantError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(4);
  });
});

describe('Alert', () => {
  test('defaults', () => {
    const { asFragment } = render(<Alert />);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`aria-atomic, aria-live, role defaults can't be overridden`, () => {
    console.error = jest.fn();
    const component = <Alert aria-atomic={false} aria-live="polite" role="status" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaAtomicError = `Warning: Failed prop type: ${blacklisted('aria-atomic', 'Alert')}
    in Alert`;
    const ariaLiveError = `Warning: Failed prop type: ${blacklisted('aria-live', 'Alert')}
    in Alert`;
    const roleError = `Warning: Failed prop type: ${blacklisted('role', 'Alert')}
    in Alert`;

    expect(console.error).toHaveBeenCalledWith(ariaAtomicError);
    expect(console.error).toHaveBeenCalledWith(ariaLiveError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(3);
  });

  test(`aria-relevant default can be overridden`, () => {
    const component = <Alert aria-relevant="all" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('spreads other props including children', () => {
    const component = (
      <Alert id="my-live-region" className="my-live-region-class">
        Hello World
      </Alert>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`logs errors for invalid props`, () => {
    console.error = jest.fn();

    render(<Alert aria-relevant="additions bad text" />);

    const ariaRelevantError = `Warning: Failed prop type: ${invalidAriaRelevant('bad', 'aria-relevant', 'Alert')}
    in Alert`;

    expect(console.error).toHaveBeenCalledWith(ariaRelevantError);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Status', () => {
  test('defaults', () => {
    const { asFragment } = render(<Status />);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`aria-atomic, aria-live, role defaults can't be overridden`, () => {
    console.error = jest.fn();
    const component = <Status aria-atomic={false} aria-live="assertive" role="alert" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaAtomicError = `Warning: Failed prop type: ${blacklisted('aria-atomic', 'Status')}
    in Status`;
    const ariaLiveError = `Warning: Failed prop type: ${blacklisted('aria-live', 'Status')}
    in Status`;
    const roleError = `Warning: Failed prop type: ${blacklisted('role', 'Status')}
    in Status`;

    expect(console.error).toHaveBeenCalledWith(ariaAtomicError);
    expect(console.error).toHaveBeenCalledWith(ariaLiveError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(3);
  });

  test(`aria-relevant default can be overridden`, () => {
    const component = <Status aria-relevant="all" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('spreads other props including children', () => {
    const component = (
      <Status id="my-live-region" className="my-live-region-class">
        Hello World
      </Status>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`logs errors for invalid props`, () => {
    console.error = jest.fn();

    render(<Status aria-relevant="additions bad text" />);

    const ariaRelevantError = `Warning: Failed prop type: ${invalidAriaRelevant('bad', 'aria-relevant', 'Status')}
    in Status`;

    expect(console.error).toHaveBeenCalledWith(ariaRelevantError);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});

describe('Log', () => {
  test('defaults', () => {
    const { asFragment } = render(<Log />);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`aria-live and role defaults can't be overridden`, () => {
    console.error = jest.fn();
    const component = <Log aria-live="assertive" role="alert" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaLiveError = `Warning: Failed prop type: ${blacklisted('aria-live', 'Log')}
    in Log`;
    const roleError = `Warning: Failed prop type: ${blacklisted('role', 'Log')}
    in Log`;

    expect(console.error).toHaveBeenCalledWith(ariaLiveError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  test(`aria-atomic and aria-relevant default can be overridden`, () => {
    const component = <Log aria-atomic={true} aria-relevant="all" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('spreads other props including children', () => {
    const component = (
      <Log id="my-live-region" className="my-live-region-class">
        Hello World
      </Log>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`logs errors for invalid props`, () => {
    console.error = jest.fn();

    render(<Log aria-atomic={3} aria-relevant="additions bad text" />);

    const ariaAtomicError = `Warning: Failed prop type: Invalid prop \`aria-atomic\` of type \`number\` supplied to \`Log\`, expected \`boolean\`.
    in Log`;

    const ariaRelevantError = `Warning: Failed prop type: ${invalidAriaRelevant('bad', 'aria-relevant', 'Log')}
    in Log`;

    expect(console.error).toHaveBeenCalledWith(ariaAtomicError);
    expect(console.error).toHaveBeenCalledWith(ariaRelevantError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});

describe('Progressbar', () => {
  test('defaults', () => {
    console.error = jest.fn();

    const { asFragment } = render(<Progressbar />);
    expect(asFragment()).toMatchSnapshot();

    expect(console.error).not.toHaveBeenCalled();
  });

  test(`aria-valuemax, aria-valuemin, and role defaults can't be overridden`, () => {
    console.error = jest.fn();
    const component = <Progressbar aria-valuemax={100} aria-valuemin={10} role="alert" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaValueMaxError = `Warning: Failed prop type: ${blacklisted('aria-valuemax', 'Progressbar')}
    in Progressbar`;
    const ariaValueMinError = `Warning: Failed prop type: ${blacklisted('aria-valuemin', 'Progressbar')}
    in Progressbar`;
    const roleError = `Warning: Failed prop type: ${blacklisted('role', 'Progressbar')}
    in Progressbar`;

    expect(console.error).toHaveBeenCalledWith(ariaValueMaxError);
    expect(console.error).toHaveBeenCalledWith(ariaValueMinError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(3);
  });

  test(`aria-valuenow must be between 0 and 1 inclusive`, () => {
    console.error = jest.fn();
    const { asFragment } = render(<Progressbar aria-valuenow={-0.001} />);
    expect(asFragment()).toMatchSnapshot();

    render(<Progressbar aria-valuenow={1.001} />);
    render(<Progressbar aria-valuenow={0} />);
    render(<Progressbar aria-valuenow={1} />);
    render(<Progressbar aria-valuenow={0.5} />);

    const ariaValueNowLowError = `Warning: Failed prop type: ${zeroToOne('-0.001', 'aria-valuenow', 'Progressbar')}
    in Progressbar`;
    const ariaValueNowHighError = `Warning: Failed prop type: ${zeroToOne('1.001', 'aria-valuenow', 'Progressbar')}
    in Progressbar`;

    expect(console.error).toHaveBeenCalledWith(ariaValueNowLowError);
    expect(console.error).toHaveBeenCalledWith(ariaValueNowHighError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  test('spreads other props including children', () => {
    const component = (
      <Progressbar id="my-live-region" className="my-live-region-class">
        Hello World
      </Progressbar>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Marquee', () => {
  test('defaults', () => {
    const { asFragment } = render(<Marquee />);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`aria-live and role defaults can't be overridden`, () => {
    console.error = jest.fn();
    const component = <Marquee aria-live="assertive" role="alert" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaLiveError = `Warning: Failed prop type: ${blacklisted('aria-live', 'Marquee')}
    in Marquee`;
    const roleError = `Warning: Failed prop type: ${blacklisted('role', 'Marquee')}
    in Marquee`;

    expect(console.error).toHaveBeenCalledWith(ariaLiveError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  test(`aria-atomic and aria-relevant default can be overridden`, () => {
    const component = <Marquee aria-atomic={true} aria-relevant="all" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('spreads other props including children', () => {
    const component = (
      <Marquee id="my-live-region" className="my-live-region-class">
        Hello World
      </Marquee>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`Marquees errors for invalid props`, () => {
    console.error = jest.fn();

    render(<Marquee aria-atomic={3} aria-relevant="additions bad text" />);

    const ariaAtomicError = `Warning: Failed prop type: Invalid prop \`aria-atomic\` of type \`number\` supplied to \`Marquee\`, expected \`boolean\`.
    in Marquee`;

    const ariaRelevantError = `Warning: Failed prop type: ${invalidAriaRelevant('bad', 'aria-relevant', 'Marquee')}
    in Marquee`;

    expect(console.error).toHaveBeenCalledWith(ariaAtomicError);
    expect(console.error).toHaveBeenCalledWith(ariaRelevantError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});

describe('Timer', () => {
  test('defaults', () => {
    const { asFragment } = render(<Timer />);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`aria-live and role defaults can't be overridden`, () => {
    console.error = jest.fn();
    const component = <Timer aria-live="assertive" role="alert" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const ariaLiveError = `Warning: Failed prop type: ${blacklisted('aria-live', 'Timer')}
    in Timer`;
    const roleError = `Warning: Failed prop type: ${blacklisted('role', 'Timer')}
    in Timer`;

    expect(console.error).toHaveBeenCalledWith(ariaLiveError);
    expect(console.error).toHaveBeenCalledWith(roleError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  test(`aria-atomic and aria-relevant default can be overridden`, () => {
    const component = <Timer aria-atomic={true} aria-relevant="all" />;
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('spreads other props including children', () => {
    const component = (
      <Timer id="my-live-region" className="my-live-region-class">
        Hello World
      </Timer>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test(`Timers errors for invalid props`, () => {
    console.error = jest.fn();

    render(<Timer aria-atomic={3} aria-relevant="additions bad text" />);

    const ariaAtomicError = `Warning: Failed prop type: Invalid prop \`aria-atomic\` of type \`number\` supplied to \`Timer\`, expected \`boolean\`.
    in Timer`;

    const ariaRelevantError = `Warning: Failed prop type: ${invalidAriaRelevant('bad', 'aria-relevant', 'Timer')}
    in Timer`;

    expect(console.error).toHaveBeenCalledWith(ariaAtomicError);
    expect(console.error).toHaveBeenCalledWith(ariaRelevantError);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
