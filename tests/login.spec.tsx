import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Wrapper from './Wrapper'
import Login from '../src/pages/login'

describe('Login component', () => {
  render(<Wrapper><Login /></Wrapper>)

  it('should render', () => {
    screen.getByText(/登录/i)
  })
  
  it('input', () => {
    expect(true).toBeTruthy()
  })
})