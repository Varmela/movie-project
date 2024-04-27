import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postDataProfile } from "../api";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const Signup = () => {
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

  const { mutate, error } = useMutation({
    mutationFn: postDataProfile,
    onSuccess: () => {
      nav('/');
    },
    onError: (e) => {
      console.log(e);
      alert("Your profile was not created");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="signup-form-body">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="signup-title">Signup</h1>
        <div className="input-group">
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="input-field"
          />
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
        </div>
        <div className="input-group">
          <input
            {...register("email")}
            type="email"
            placeholder="email@gmail.com"
            className="input-field"
          />
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
        </div>
        <div className="input-group">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>
        <button disabled={isSubmitting} type="submit" className="submit-btn">
          {isSubmitting ? "Sending.." : "Submit"}
        </button>
        <p>Already have an account?<Link to = '/login'>Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
