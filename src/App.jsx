import { useState } from 'react'

import './App.css'
import ToolBar from '@component/ToolBar'
import Product from '@component/Product.jsx'
import Product_meta from '@component/Product_meta'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <ToolBar/>
        <Product/>
      </header>

      <main>
        <Product_meta/>
      </main>
    </>
  )
}

export default App
