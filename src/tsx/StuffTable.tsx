import React, { SFC } from 'react';
import { IStuffTableProps, IStuff } from './interface'

const StuffTable: SFC<IStuffTableProps> = ({ stuffData }) => {
  return (
    <div className="StuffTable">
      <table>
        <thead>
          <tr>
            <th>stuff</th>
            <th>Scale</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {stuffData.map((item: IStuff, index: number) => (
            <tr key={`${item.stuff}_${index}`}>
              <td>{item.stuff}</td>
              <td>{item.scale}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default StuffTable;