import "./App.css"
import Router from "./router/Router"
import { Toaster } from "sonner"
const App = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Router />
    </div>
  )
}

export default App
