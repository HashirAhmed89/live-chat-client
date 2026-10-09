import App_Routes from "./all_Routes/app_Routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/auth_Context";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App_Routes/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;




