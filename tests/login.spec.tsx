import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Wrapper from './Wrapper';
import Login from '../src/pages/login';

describe('Login component', () => {
  render(<Wrapper><Login /></Wrapper>);

  it('has a login button', () => {
    render(<Wrapper><Login /></Wrapper>);
    screen.getByText(/登录/i);
  });
});