/* BTIB */
import Home from "./pages/Home";
import { theme } from "./components/Theme/Theme";
/* Libs & plugins */
import { ThemeProvider } from "@mui/material/styles";

function App() {
  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
