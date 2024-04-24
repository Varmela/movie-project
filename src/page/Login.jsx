import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const nav = useNavigate();
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

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    nav("/");
  };
  return (
    <div className="form-body">
      <motion.form
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading.." : "Submit"}
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
