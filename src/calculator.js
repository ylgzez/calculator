import React from 'react'
import { useCalcContext } from './context'
import Pad from './pad'
import data from './data'

const Calculator = () => {
  const {input, expr} = useCalcContext()

  return (  
    <main>
      <article>
        <section className='display'>
          <div style={{color: 'orange'}}>{expr}</div>
          <div id='display' style={{color: 'white'}}>{input}</div>
        </section>
        <section id='pads'>
          {
            data.map((item) => {
            return <Pad key={item.id} id={item.id} sign={item.sign} />
          })
          }
        </section>
      </article>
    </main>
  )
}

export default Calculator