import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from "redux-persist/integration/react";
import { HeroUIProvider } from "@heroui/react";
// import "@/styles/globals.css";


createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  </HeroUIProvider>

)
