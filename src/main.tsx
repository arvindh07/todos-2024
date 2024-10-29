import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddTodo from './components/AddTodo.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/add",
    element: <AddTodo />
  }
])

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
