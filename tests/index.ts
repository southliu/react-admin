
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// 解决matchMedia报错
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(global.window, 'matchMedia', {
    value: vi.fn((query: string) => ({
      matches: query.includes('max-width'),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }))
  });
}
