import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { loginData } from "../api";
import { useMutation } from "@tanstack/react-query";
import { checkIfTokenIsValid } from "../helper";
import { jwtDecode } from "jwt-decode";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (checkIfTokenIsValid() === true) {
      nav("/");
    }
  }, [nav]);

  const { mutateAsync, error } = useMutation({
    mutationFn: loginData,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.idToken);
     const token = data.idToken;
     const decoded = jwtDecode(token);
     const user_id = decoded.user_id;
      localStorage.setItem("user_id", user_id);
    nav('/');
    if (decoded.isAdmin) {
      nav('/admin-dashboard'); // Navigate to admin dashboard if the user is an admin
    } else {
      nav('/'); // Navigate to user dashboard if the user is not an admin
    }
    },
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "mela@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  return (
    <div className="form-body">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">Login</h1>
        <input
          {...register("email")}
          type="email"
          placeholder="email@gmail.com"
        />
        {errors.email && (
          <div style={{ color: "red" }} className="text-red-500">
            {errors.email.message}
          </div>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div style={{ color: "red" }}>{errors.password.message}</div>
        )}
        <button type="submit">{isSubmitting ? "Loading.." : "Submit"}</button>
        <p>
          You don't have an account? <Link to="/register">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
