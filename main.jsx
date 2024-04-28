import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './src/pages/Home'
import Cart from './src/pages/Cart'
import WishList from './src/pages/WishList'
import { store } from './src/store/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider Provider store={store} >
        <App />,
      </Provider >
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/wishlist',
        element: <WishList />,
      },
    ],
  },
])

createRoot(document.querySelector('#root')).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position='top-center'
      autoClose='1000'
    />
  </>
)