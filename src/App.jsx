import App_Routes from "../src/Routes/route"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./auth/authcontext"
import { ConversationProvider } from "./conversationcontext/conversationcontext"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConversationProvider>
          <App_Routes />
        </ConversationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App