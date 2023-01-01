import { useState } from 'react'
import { invoices } from "../db.json"
import Nav from './Components/Nav'
import Table from './Components/Table'
function App() {
  const[tax,setTax] = useState(null)
  const getTax = (value) =>{
    setTax(value)
  } 
  return (
    <div>
      <Nav/>
      <marquee className="blink" behavior="scroll">Calculate TAX by click the Button !</marquee>
      <Table data={invoices} getTax={getTax}/>
      <div>
        <h1 className='amount'><span data-cy="show-tax">Calculated Tax Value :</span><span data-cy="tax-value">{tax==null?"You are not selecting anything":tax}</span></h1>
      </div>
    </div>
  )
}

export default App
