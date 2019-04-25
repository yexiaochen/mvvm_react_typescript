import { KeyboardEvent } from 'react'

export interface IStuff {
  stuff: string,
  scale: string,
  salary: string,
  [index: string]: string
}

export interface IState {
  stuffItem: IStuff,
  stuffData: Array<any>,
}

export interface IModifyStuffProps {
  stuffItem: IStuff,
  handleModifyChange(item: IStuff, event: KeyboardEvent<HTMLInputElement>): void
}

export interface ISearchProps {
  handleSearchChange(event: KeyboardEvent<HTMLInputElement>): void
}

export interface IStuffTableProps {
  stuffData: Array<any>
}