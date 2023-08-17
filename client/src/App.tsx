import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Loading from "./components/Loading"
import { Login, Register } from "./pages/Auth"
import { Home, ObserveThread } from "./pages/Home"
import { RootState } from "./stores/types/rootState"
import useCheckAuth from './hooks/useCheckAuth'

const queryClient = new QueryClient()

function App() {
  const { isLoading } = useCheckAuth()
  const auth = useSelector((state: RootState) => state.auth)

  function IsLogin() {
    if (!auth.email) {
      return <Navigate to={"/auth/login"} />
    } else {
      return <Outlet />
    }
  }

  function IsNotLogin() {
    if (auth.email) {
      return <Navigate to={"/"} />
    } else {
      return <Outlet />
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<IsLogin />}>
              <Route path="/" element={<Home />} />
              <Route path="/thread/:id" element={<ObserveThread />} />
            </Route>
            <Route path="/" element={<IsNotLogin />}>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      )}
    </React.Fragment>
  )
}

export default App
