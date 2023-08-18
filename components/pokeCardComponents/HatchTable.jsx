import React from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";

  import { eggGroupTranslations} from '@utils/translator';

  import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
  import {Divider} from "@nextui-org/divider";

export const HatchTable = ({specie}) => {
  return (
    <div className='w-fit'>
    <h2 className=' text-left text-2xl pl-2 font-inter font-bold mb-2'>Crianza</h2>
          <Table isStriped  hideHeader aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Grupos huevo: </TableCell>
            <TableCell className='text-left'>
              {specie.egg_groups.map((group, index) => (
                index === (specie.egg_groups.length - 1) ?  
                <span key={index}>{eggGroupTranslations[group.name]}</span> 
                : 
                <span key={index}>{eggGroupTranslations[group.name]}, </span>
              ))}
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell >Genero: </TableCell>
            <TableCell className='flex flex-row'>
               { specie.gender_rate < 0 ? (<span>Sin genero</span>) :
                (<>
                <IconGenderMale
                color='#2137fd'
                /> <span>{100 / 8 * (8 - specie.gender_rate ) }%</span>
                <Divider orientation="vertical" className='mx-2  h-auto bg-gray-600'/>
                <IconGenderFemale
                color='#c514e9'
                /> <span>{ 100 / 8 * specie.gender_rate }%</span>
                </>
                ) }

            </TableCell>
          </TableRow>

          <TableRow key="3">
            <TableCell >Ciclos huevo: </TableCell>
            <TableCell className='flex flex-row'>
                <p>
                  {specie.hatch_counter}
                <span className='text-sm font-medium mt-2 pl-2 text-[#9e9e9e] italic'> ({255 * (specie.hatch_counter + 1)} pasos aprox.)</span>
                </p>
                
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
