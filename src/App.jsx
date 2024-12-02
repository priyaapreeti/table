import { useState } from 'react'
import './App.css'
import Table from './components/Table'

function App() {
  const [data, setData] = useState([
    {
      id: "electronics",
      label: "Electronics",
      value: 1400,
      children: [
        { id: "phones", label: "Phones", value: 800 },
        { id: "laptops", label: "Laptops", value: 700 },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      children: [
        { id: "tables", label: "Tables", value: 300 },
        { id: "chairs", label: "Chairs", value: 700 },
      ],
    },
  ])

  return (
    <>
    <h1>Hierarchical Table Application</h1>
      <Table rows={data} setRows={setData}/>
    </>
  )
}

export default App
