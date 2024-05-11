import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTicket, ticketLoader, updateTicket } from "../api";

const TicketPage = () => {
  const nav = useNavigate();
  const userId = localStorage.getItem("user_id");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ticket-data"],
    queryFn: ticketLoader,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [name, setName] = useState("");
  const [email,setEmail] = useState('');
  const [movieTitle,setMovieTitle] = useState('');
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [theater, setTheater] = useState("");




  
  const updateMutation = useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      refetch();
      toast("Ticket was updated successfully");
      setIsModalOpen(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    updateMutation.mutate({
      id: selectedTicket.id,
      ticketToChange: {userId, name,email,movieTitle, date, time, theater },
    });
    refetch();
  };
console.log(updateMutation);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      refetch();
      toast("Ticket is deleted!");
    },
    onError: () => {
      toast("Something went wrong");
    },
  });


  useEffect(()=>{
    setName(selectedTicket?.name);
    setEmail(selectedTicket?.email);
    setMovieTitle(selectedTicket?.movieTitle);
    setDate(selectedTicket?.date);
    setTime(selectedTicket?.time);
    setTheater(selectedTicket?.theater);
  },[selectedTicket])
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ticket data</div>;

  const userTickets = data.filter((ticket) => ticket.user_id === userId);
  if (userTickets.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>You have no tickets yet.</p>
        <Link to="/" className="button">Go to Movie Listings</Link>
      </div>
    );
  }
  
console.log(data)
  

  return (
    <>
      <div style={{ padding: "30px" }} className="ticket-container">
        <Link
          to="/"
          className="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Movie Listings
        </Link>
<h1 style={{textAlign:'center'}}>All your ticket 🎫</h1> 
        {userTickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <div className="ticket-header">
              <h2 className="ticket-title">Movie Ticket</h2>
            </div>
            <div className="ticket-details">
              <div className="ticket-info">
                <FaMapMarker className="ticket-icon" />
                <span className="ticket-text">Cinema +,TIRANA</span>
              </div>
              <div className="ticket-info">
                <span className="ticket-text">Name: {ticket.name}</span>
              </div>
              <div className="ticket-info">
                <span className="ticket-text">Email: {ticket.email}</span>
              </div>
              <div className="ticket-info">
                <span className="ticket-text">Movie Title: {ticket.movieTitle}</span>
              </div>
              <div className="ticket-info">
                <span className="ticket-text">Date: {ticket.date}</span>
              </div>
              <div className="ticket-info">
                <span className="ticket-text">Time: {ticket.time}</span>
              </div>
              <div className="ticket-info">
                <span className="ticket-text">Theater: {ticket.theater}</span>
              </div>
            </div>
            <button
              className="ticket-button"
              onClick={() => handleEditClick(ticket)}
            >
              Edit
            </button>
            <Popconfirm
            title="Delete the ticket"
            description="Are you sure to delete this ticket?"
            onConfirm={() => deleteMutation.mutate(ticket.id)}
            okText="👍"
            cancelText="No"
          >
           <button className="ticket-delete-button"> Delete</button> 
          </Popconfirm>

          </div>
        ))}
      </div>
      <Modal
      title="Edit Ticket"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="custom-modal" 
    >
      <label htmlFor="name">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        className="input-field"
        type="text"
        defaultValue={selectedTicket?.name}
      />
      <label htmlFor="email">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        className="input-field"
        type="email"
        defaultValue={selectedTicket?.email}
        disabled
      />
      <label htmlFor="title">Movie Title</label>
      <input
        value={movieTitle}
        onChange={(e) => setMovieTitle.target.value}
        id="title"
        className="input-field"
        type="text"
        defaultValue={selectedTicket?.movieTitle}
      />
      <label>Date</label>
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input-field"
        type="date"
        defaultValue={selectedTicket?.date}

      />
      <label>Time</label>
      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="input-field"
        type="time"
        defaultValue={selectedTicket?.time}
      />
      <label>Theater</label>
      <input
        value={theater}
        onChange={(e) => setTheater(e.target.value)}
        className="input-field"
        type="text"
        defaultValue={selectedTicket?.theater}

      />
    </Modal>
    
    </>
  );
};

export default TicketPage;
