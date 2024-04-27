import './reservation.css';
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllMovies } from '../api';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect,useState } from 'react';

export const schema = z.object({
  name: z.string().min(2, { message: "Name has to be at least 2 characters" }),
  email: z.string().email({ message: "Not a valid email" }),
  movie: z.string(),
  date: z.string().transform((value) => new Date(value)),
  time: z.string().nullable(), //lejon te jete ose e specifikuar ose null
  theater: z
    .string()
    .nullable()
    .refine((val) => val !== "", {
      message: "You have to select a theater",
      path: ["theater"],
    }),
  termsAndConditions: z.boolean(),
});

const Reservation = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      movie: "",
      date: "",
      time: "",
      theater: "",
      termsAndConditions: false,
    },
    resolver: zodResolver(schema),
  });

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((data) => {
      setMovies(data);
    });
  }, []);
  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="reservation-body">
    
      <form className="reservation" onSubmit={handleSubmit(onSubmit)}>
      <h1 className='reserve-title'>Reservation</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.name}
                label="Name"
                type="text"
                variant="outlined"
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.email}
                label="Email"
                type="email"
                variant="outlined"
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="movie"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.movie} variant="outlined">
                <InputLabel id="movie">Movie</InputLabel>
                <Select {...field} labelId="movie" label="Movie">
                  {movies.map((movie) => (
                    <MenuItem key={movie.id} value={movie.title}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
                {errors.movie && <FormHelperText>{errors.movie.message}</FormHelperText>}
              </FormControl>
            )}
          />
       
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.date}
                label="Date"
                type="date"
                variant="outlined"
                helperText={errors.date?.message}
              />
            )}
          />

          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.time}
                label="Time"
                type="time"
                variant="outlined"
                helperText={errors.time?.message}
              />
            )}
          />
          <Controller
            name="theater"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.theater} variant="outlined">
                <InputLabel id="theater">Theater</InputLabel>
                <Select {...field} labelId="theater" label="Theater">
                  <MenuItem value="theater1">Theater 1</MenuItem>
                  <MenuItem value="theater2">Theater 2</MenuItem>
                  <MenuItem value="theater3">Theater 3</MenuItem>
                </Select>
                {errors.theater && (
                  <FormHelperText>{errors.theater.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <FormControl
                error={!!errors.termsAndConditions}
                variant="outlined"
              >
                <FormControlLabel
                  {...field}
                  control={<Checkbox {...field} />}
                  label="Accept terms and conditions"
                />
                {errors.termsAndConditions && (
                  <FormHelperText>
                    {errors.termsAndConditions.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Box>

        <Button variant="contained" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading.." : "Submit"}
        </Button>
        <Link style={{color:'red'}} to='/'>Cancel</Link>
      </form>
    </div>
  );
};

export default Reservation;
