import React, { SFC } from 'react';
import { IModifyStuffProps } from './interface'

const ModifyStuff: SFC<IModifyStuffProps> = ({ stuffItem, handleModifyChange }) => {
  return (
    <div className="ModifyStuff">
      <fieldset>
        <legend>搜索/修改:</legend>
        {JSON.stringify(stuffItem) !== "{}" ?
          <table>
            <thead>
              <tr>
                <th>stuff</th>
                <th>Scale</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stuffItem.stuff}</td>
                <td><input key={stuffItem.stuff} className="ModifyStuffInput" data-type="scale" onKeyPress={event => handleModifyChange(stuffItem, event)} defaultValue={stuffItem.scale} /></td>
                <td><input key={stuffItem.stuff} className="ModifyStuffInput" data-type="salary" onKeyPress={event => handleModifyChange(stuffItem, event)} defaultValue={stuffItem.salary} /></td>
              </tr>
            </tbody>
          </table> : '没有相关数据'
        }
      </fieldset>
    </div>
  )
}
export default ModifyStuff;