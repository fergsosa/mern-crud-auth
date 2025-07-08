import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginImg from "../assets/img/login.svg";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: errorsUseForm },
  } = useForm();
  const { signin, errors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <>
      <div className="example-data">
        <h4>Email: admin@a.com</h4>
        <h4>Password: admin123</h4>
      </div>
      <main className="form-containe container_form">
        <img src={loginImg} alt="login" />
        {errors.map((error, i) => (
          <div className="error-alert" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inputs">
            <label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                {...register("email", { required: true })}
              />
              <span>Email</span>
            </label>
          </div>

          {errorsUseForm.email && (
            <div className="box-error">
              <p className="text-error">Email in required</p>
            </div>
          )}

          <div className="form-inputs">
            <label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                {...register("password", { required: true, minLength: 6 })}
              />
              <span>Password</span>
            </label>
          </div>

          {errorsUseForm.password && (
            <div className="box-error">
              <p className="text-error">Password in required</p>
            </div>
          )}

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? - <Link to="/register">Register↗</Link>
        </p>
      </main>
    </>
  );
};

export default LoginPage;
