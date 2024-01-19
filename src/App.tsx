import './App.css';
import FormComponent from './components/Dashboard';
import "datatables.net-dt/css/jquery.dataTables.css";
import EmployeeTable from './components/datatable/Datatable';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<FormComponent />} />
            <Route path="/table" element={<EmployeeTable />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
