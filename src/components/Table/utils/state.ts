import type { Dispatch } from 'react'
import { createContext } from 'react'
import { ITableAction } from './reducer'

interface IScrollContextProps {
  dispatch?: Dispatch<ITableAction>;
  renderLen: number;
  start: number;
  offsetStart: number;
  rowHeight: number;
  totalLen: number;
}

export const ScrollContext = createContext<IScrollContextProps>({
  dispatch: undefined,
  renderLen: 1,
  start: 0,
  offsetStart: 0,
  rowHeight: 46,
  totalLen: 0
})