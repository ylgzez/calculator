import React, {useState, useContext} from 'react'

const CalcContext = React.createContext()

const CalcProvider = ({children}) => {
  const [input, setInput] = useState('0')
  const [expr, setExpr] = useState('')
  const [fresh, setFresh] = useState(true)

  const updateCalc = (sign) => {
    if(!fresh) {
      if (sign.match(/^\+$|^-$|^x$|^\/$/)) {
        setExpr(input + sign)
        setInput(sign)
      } else if (sign.match(/\./)) {
        setExpr('0.')
        setInput('0.')
      } else {
        setExpr(sign)
        setInput(sign)
      }
      setFresh(true)
    } else {
        if (sign.match(/^\+$|^-$|^x$|^\/$/)) { // math input is calculating sign
          setInput(sign)
          if (expr.length > 0) {
            if (expr[expr.length - 1].match(/^\+$|^-$|^x$|^\/$/)) { // two signs in a row
              if (sign.match(/-/) && !expr[expr.length - 1].match(/-/)) { // [+x/] - => [+x/] -
                setExpr(expr + sign)
              } else { // [+x/]? - - => - // [+x/] [+x/] => [+x/]
                console.log('expr: ', expr)
                setExpr(expr.replace(/[+\-x/]?[+\-x/]$/,sign))
              }             
            } else {
              setExpr(expr + sign)
            }
          } else {
            setExpr(expr + sign)
          }
      } else { // math input is a number or decimal
          if (input.match(/^\+$|^-$|^x$|^\/$/)) {
              if (sign.match(/\./)) {
                setInput('0' + sign)
                setExpr(expr + '0' + sign)
              } else {
                setInput(sign)
                setExpr(expr + sign)
             }
          } else if (input.match(/^0$/)) {
            if (sign.match(/\./)) {
              setInput(input + sign)
              setExpr(expr + '0' + sign)
            } else {
              setInput(sign)
              expr.length ? setExpr(expr.slice(0, expr.length-1) + sign) : setExpr(sign) // 
            }
          } else if(input.match(/\./)) {
            if (!sign.match(/\./)) { // no two decimals in one input
              setInput(input + sign)
              setExpr(expr + sign)                     
            }
          } else {
            setInput(input + sign)
            setExpr(expr + sign)          
          }          
      }
    }
  }

  const clearCalc = () => {
    setInput('0')
    setExpr('')
    setFresh(true)
  }

  const evalCalc = () => {
    try {
      const result = eval(expr.replace(/x/g, '*')).toString()
      setExpr(expr + '=' + result)
      setInput(result)
      setFresh(false)
    } catch (err) {
      console.log('err: ', err.message)
    }
  }

  return (
    <CalcContext.Provider value={{input, expr, updateCalc, clearCalc, evalCalc}}>
      {children}
    </CalcContext.Provider>
  )
}

export const useCalcContext = () => {
  return useContext(CalcContext)
}

export {CalcContext, CalcProvider}

