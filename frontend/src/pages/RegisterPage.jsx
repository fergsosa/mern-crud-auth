import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signinImg from "../assets/img/signin.svg";

import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: errorsUseForm },
  } = useForm();
  const { signup, errors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = async (values) => signup(values);

  return (
    <main className="form-containe container_form">
      <img src={signinImg} alt="login" />

      {errors.map((error, i) => (
        <div className="error-alert" key={i}>
          {error}
        </div>
      ))}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inputs">
          <label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder=" "
              {...register("username", { required: true })}
            />
            <span>username</span>
          </label>
        </div>

        {errorsUseForm.username && (
          <div className="box-error">
            <p className="text-error">Username in required</p>
          </div>
        )}
        <div className="form-inputs">
          <label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              {...register("email", { required: true })}
            />
            <span>email</span>
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
              {...register("password", { required: true })}
            />
            <span>password</span>
          </label>
        </div>

        {errorsUseForm.password && (
          <div className="box-error">
            <p className="text-error">Password in required</p>
          </div>
        )}

        <div className="form-inputs">
          <label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="  "
              {...register("confirmPassword", { required: true })}
            />
            <span>confirm Password</span>
          </label>
        </div>

        {errorsUseForm.confirmPassword && (
          <div className="box-error">
            <p>Confirm password in required</p>
          </div>
        )}

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? - <Link to="/login">Login↗</Link>
      </p>
    </main>
  );
};

export default RegisterPage;
