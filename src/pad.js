import React from 'react'
import {useCalcContext} from './context'

const Pad = ({id, sign}) => {
  const {updateCalc, clearCalc, evalCalc} = useCalcContext()
  if (sign === 'AC') {
    return (
      <button id={id} type='button' onClick={clearCalc}>
        {sign}
      </button>
    )
  }
  if (sign.match(/\d|\.|\+|-|x|\//)) {
    return (
      <button id={id} type='button' onClick={()=>{updateCalc(sign)}}>
        {sign}
      </button>
    )   
  }
  if (sign === '=') {
    return (
      <button id={id} type='button' onClick={evalCalc}>
        {sign}
      </button>
    )
  }
}

export default Pad
