import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="home-page">
      <header>
        <h1>React: Task Manager con Autenticación</h1>
        <p>
          Este proyecto es una aplicación web fullstack que permite a los
          usuarios registrarse, iniciar sesión y gestionar una lista de tareas
          personalizadas. Cada usuario tiene su propia cuenta y sus tareas se
          almacenan de forma segura en una base de datos MongoDB.
        </p>

        <h3>🚀 Características</h3>
        <p>
          🔐 El sistema implementa <b>autenticación con JWT</b> y
          <b>gestión de sesiones mediante cookies</b>.
        </p>
        <p>
          📝 Una vez autenticado, el usuario puede
          <b>crear, leer, actualizar y eliminar tareas</b> (CRUD).
        </p>
        <p>
          🌐 Toda la información del usuario se almacena de forma segura en
          <b>MongoDB</b>, asociando las tareas con su cuenta personal.
        </p>

        <Link to="/register">Get Started</Link>
      </header>
    </section>
  );
}

export default HomePage;
