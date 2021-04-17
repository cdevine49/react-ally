import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from '../src/alert';

describe('WAI-ARIA Roles, States, and Properties', () => {
  test('The element has role alert', () => {
    render(<Alert />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('The element has aria-live set to assertive', () => {
    render(<Alert />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  test('The element has aria-atomic set to true', () => {
    render(<Alert />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-atomic', 'true');
  });
});

describe('Props', () => {
  test('Spreads props on the alert element', () => {
    const id = 'my-id';
    const className = 'red';
    render(<Alert className={className} id={id} />);

    expect(screen.getByRole('alert')).toHaveAttribute('class', className);
    expect(screen.getByRole('alert')).toHaveAttribute('id', id);
  });

  test('Role cannot be overridden', () => {
    const ignoredRole = 'region';
    render(<Alert role={ignoredRole} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole(ignoredRole)).not.toBeInTheDocument();
  });

  test('Aria-assertive cannot be overridden', () => {
    render(<Alert aria-live="polite" />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  test('Aria-atomic cannot be overridden', () => {
    render(<Alert aria-atomic={false} />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-atomic', 'true');
  });
});
