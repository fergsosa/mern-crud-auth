import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TasksContext";

import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container-app">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
