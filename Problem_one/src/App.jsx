import { useState } from 'react'
import Body from './Components/Body'
import Nav from './Components/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Nav />
      <marquee className="blink" behavior="scroll">Calculate your TAX file in one click!</marquee>
      <Body />
    </div>
  )
}

export default App
