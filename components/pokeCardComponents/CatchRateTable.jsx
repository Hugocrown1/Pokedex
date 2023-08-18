import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {CircularProgress} from "@nextui-org/progress";
import {Chip} from "@nextui-org/chip";


export const CatchRateTable = ({pokemonHP, captureRate}) => {

    const CalculateCaptureProb = (hp, catchRate) => {
    
        const result = (( 1 + ( hp * 3 - hp * 2 ) * catchRate * 1 * 1 ) / ( hp * 3 )) / 256 * 100
        return result.toFixed(1)
    }

    const captureProb = CalculateCaptureProb(pokemonHP, captureRate)

    
  return (
    <div>
                <h2 className=' text-left text-2xl pl-2 font-inter font-bold mb-2'>Prob. de captura</h2>
            
                    <Card className="w-[200px] h-[200px] border-none ">
                <CardBody className="justify-center items-center pb-0">
                  <CircularProgress
                  aria-label='Catch probability'
                    size='sm'
                    color={captureProb < 20 ? (captureProb < 10 ? 'danger' : 'warning') : 'success'}
                    classNames={{
                      svg: "w-32 h-32 drop-shadow-md",
            
                      track: "stroke-white/10",
            
            
            
                      value: "text-3xl font-semibold text-white",
                    }}
                    // Se manda la vida y la tasa de captura del pokemon
                    value={captureProb}
            
            
                    formatOptions= {{style: 'unit', unit: 'percent'}}
                    strokeWidth={4}
                    showValueLabel={true}
                  />
                </CardBody>
                <CardFooter className="justify-center items-center pt-0">
                  <Chip
                    classNames={{
                      base: "border-1 border-white/30",
                      content: "text-white/90 text-small font-semibold",
                    }}
                    variant="bordered"
                  >
                    Tasa de captura: {captureRate}
                  </Chip>
                </CardFooter>
                        </Card>
                        <h3 className='text-sm font-medium mt-2 pl-2 text-[#9e9e9e] italic'>Vida llena y usando PokeBall</h3>
            
              </div>
  )
}
