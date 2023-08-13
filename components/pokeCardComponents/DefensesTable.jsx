import React from 'react'
import TypeIcon from './TypeIcon';
import { pokemonTypes } from '@utils/pokeTypes';

export const DefensesTable = ({weaknesses}) => {


    const weaknessProvider = (type) => {
        if(weaknesses[type] === 1) {
          return { value: weaknesses[type], style : 'type-fx-cell type-fx-100' }
        }
        else if (weaknesses[type] === 0) {
          return { value: weaknesses[type], style: 'type-fx-cell type-fx-0' };
        } else if (weaknesses[type] < 0.5) {
          return { value: weaknesses[type], style: 'type-fx-cell type-fx-25' };
        } else if (weaknesses[type] < 1) {
          return { value: weaknesses[type], style: 'type-fx-cell type-fx-50' };
        } else if (weaknesses[type] < 4) {
          return { value: weaknesses[type], style: 'type-fx-cell type-fx-200' };
        } else {
          return { value: weaknesses[type], style: 'type-fx-cell type-fx-400' };
        }
      };

  return (
    <div className='flex justify-center items-center gap-x-4 bg-white py-5 rounded-lg shadow-2xl'>
            <table>
              <tbody>
                {pokemonTypes.firstBatch.map((type, index) =>{ 
                  const { style, value } = weaknessProvider(type)
                
                return <tr key={index}>
                <th>
                  <TypeIcon type={type}/>
                </th>
                <td className={style}><span className='font-thin text-xs'>x</span>{value}</td>
                </tr>})}
              </tbody>
            </table>

            <table>
              <tbody>
                {pokemonTypes.secondBatch.map((type, index) => {
                  const { style, value } = weaknessProvider(type)
                
                return <tr key={index}>
                <th>
                  <TypeIcon type={type}/>
                </th>
                <td className={style}><span className='font-thin text-xs'>x</span>{value}</td>
                </tr>})}
              </tbody>
            </table>
          </div>
  )
}
