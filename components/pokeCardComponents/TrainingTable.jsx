import React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import {Image} from "@nextui-org/image";

import {growthRateTranslations, statTranslations } from '@utils/translator';

export const TrainingTable = ({pokemon, specie}) => {

  let effortYield

  pokemon.stats.forEach( stat => {
    if(stat.effort > 0)
      effortYield = stat
  } )

  return (
    <div className='w-auto flex flex-col font-semibold mb-2'>
              <h2 className=' text-left text-2xl font-inter pl-2 font-bold mb-2'>Entrenamiento</h2>
                  <Table isSticky isStriped className='text-left w-full font-semibold' hideHeader aria-label="Misc table">
                      <TableHeader>
                        <TableColumn>DATO</TableColumn>
                        <TableColumn>INFO</TableColumn>
                      </TableHeader>
                    <TableBody >
                    <TableRow key="1">
                        <TableCell className='font-semibold'>Habilidades: </TableCell>
                        <TableCell>
                        {pokemon.abilities.map((ability, index) => (
                      <span key={index}>
                        {ability.is_hidden ? (
                          <>
                            {ability.ability.name} (oculta)
                            {index !== pokemon.abilities.length - 1 && <br/>}
                          </>
                        ) : (
                          <>
                             {index+1}. {ability.ability.name}
                            {index !== pokemon.abilities.length - 1 && <br/>}
                          </>
                        )}
                      </span>
                    ))}
                        </TableCell>
                      </TableRow>
            
                      <TableRow key='2'>
                          <TableCell className='font-semibold'>Exp. Base: </TableCell>
                          <TableCell>{ pokemon.base_experience !== null ? pokemon.base_experience : 0}</TableCell>
                      </TableRow>
                      <TableRow key='3'>
                          <TableCell className='font-semibold'>Amistad: </TableCell>
                          <TableCell>{specie.base_happiness}</TableCell>
                      </TableRow>
            
                      <TableRow key='4'>
                          <TableCell className='font-semibold'>Crecimiento: </TableCell>
                          <TableCell>{ growthRateTranslations[specie.growth_rate.name]}</TableCell>
                      </TableRow>

                      <TableRow key='5'>
                          <TableCell className='font-semibold'>Esfuerzo: </TableCell>
                          <TableCell>+{effortYield.effort} {statTranslations[effortYield.stat.name]} </TableCell>
                      </TableRow>
            
                     
                        </TableBody>
                      </Table>
              </div>

  )
}
