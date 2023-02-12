import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from 'react'
import First from "./First"
import Home from "./Home"
import Navbar from "./Navbar"
import App from "./components/App.component"

const MyRoute = () => {
  return (
    <>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/first" element={<First />} />
          <Route path="/" element={<App/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default MyRoute