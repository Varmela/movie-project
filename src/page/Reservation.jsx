import { useState } from "react";
import "./reservation.css";

function Reservation() {
  const dataToSend = {
    name: "mela",
    email: "email@gmail.com",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState();
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [selectedOptionValue, setSelectedOptionValue] = useState();

  const initialData = {
    name: "",
    email: "",
    seats: "",
    movie: "",
    date: "",
    time: "",
    selectedOptionValue: undefined,
  };
  const [formData, setFormData] = useState(initialData);
  function handleChange(e) {
    
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  console.log(formData);
  return (
    <div className="body">
      <div className="ticket">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const dataToSend = {
              name,
              email,
              seats,
              movie,
              date,
              time,
              selectedOption: selectedOptionValue,
            };
            setName("");
            setEmail("");
            setSeats('');
            setMovie("");
            setDate('');
            setTime('');

            setFormData(initialData);
            console.log(dataToSend);
          }}
          className="ticket-form"
        >
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleChange}
            id="name"
            type="text"
            value={formData.name}
            placeholder="Name"
          ></input>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            id="email"
            placeholder="name@gmail.com"
          ></input>
          <label htmlFor="seats">Seat:</label>
          <input onChange={(event) => {
            const value = event.target.value;
            setSeats(parseInt(value));
            setFormData({ ...formData, seats: value });
          }} type="number" id="seats" value={seats} placeholder="1-100"></input>
          <label htmlFor="movie">Movie Title</label>
          <input type="text" placeholder="movie"></input>
          <label htmlFor="data">Date:</label>
          <input type="date" id="data"></input>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time"></input>
          <label>Theater🎦:</label>
          <select onChange={(e) => {
            console.log(e.target.value);
            setSelectedOptionValue(e.target.value);
          }}>
            <option>Theater 1</option>
            <option>Theater 2</option>
            <option>Theater 3</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Reservation;
