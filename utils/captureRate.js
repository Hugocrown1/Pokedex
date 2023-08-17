const captureRate = (hp, catchRate) => {
    
    const result = (( 1 + ( hp * 3 - hp * 2 ) * catchRate * 1 * 1 ) / ( hp * 3 )) / 256 * 100
    return result.toFixed(1)
}

export default captureRate