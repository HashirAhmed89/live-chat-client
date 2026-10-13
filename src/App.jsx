import App_Routes from "./all_Routes/app_Routes"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./auth/auth_Context"
import { ConversationProvider } from "./conversation_Context/conversationcontext"

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