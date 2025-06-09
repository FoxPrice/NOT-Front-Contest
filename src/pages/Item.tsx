import { useState } from 'react'

function Item() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>ITEM</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default Item
