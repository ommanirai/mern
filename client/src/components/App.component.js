import React from 'react'
// import { Login } from './Auth/Login/Login.component'
// import { Register } from './Auth/Register/Register.component'
// import { Header } from './Header/Header.component'
// import { reactDom } from 'react-dom'
import { AppRouting } from './app.routing'
// import { Toaster } from '.react-hot-toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from './../store'

// const mount = () => {
//   reactDom.render(<Register></Register>, document.getElementById('test'))
// }

// const unMount = () => {
//   reactDom.unmountComponentAtNode(document.getElementById('test'))
// }
const App = () => {
  return (
    <div>
      <Provider store = {store}>
        {/* <p>Welcome to React js</p> */}
        {/* <Header isLoggedIn={false} /> */}
        {/* <Login/> */}
        {/* <Register/> */}

        {/* component life cycle start hunxa */}
        {/* <button onClick={mount}>mount</button> */}
        {/* component life cycle destroy/end hunxa */}
        {/* <button onClick={unMount}>unmount</button> */}
        {/* <div id='test'></div> */}

        {/* configuration yaha add garna parxa */}
        {/* <Toaster /> */}
        <ToastContainer />
        <AppRouting />
      </Provider>
    </div>
  )
}

export default App