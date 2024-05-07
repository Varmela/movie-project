import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ticketLoader, updateTicket } from "../api";

const TicketPage = () => {
  const nav = useNavigate();
  const userId = localStorage.getItem("user_id");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ticket-data"],
    queryFn: ticketLoader,
  });

  // Initialize state variables with default values
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [theater, setTheater] = useState("");

  useEffect(() => {
    // Update state variables when selectedTicket changes
    if (selectedTicket) {
      setName(selectedTicket.name || "");
      setDate(selectedTicket.date || "");
      setTime(selectedTicket.time || "");
      setTheater(selectedTicket.theater || "");
    }
  }, [selectedTicket]);

  const updateMutation = useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      alert("Ticket was updated successfully");
      refetch();
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
      ticketToChange: { name, date, time, theater },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching ticket data</div>;

  const userTickets = data.filter((ticket) => ticket.user_id === userId);

  return (
    <>
      <div style={{ padding: "30px" }} className="ticket-container">
        <Link
          to="/"
          className="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Movie Listings
        </Link>
<h1 style={{textAlign:'center'}}>All your ticket</h1>
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
          </div>
        ))}
      </div>
      <Modal
      title="Edit Ticket"
      visible={isModalOpen}
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
      />
      <label>Date</label>
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input-field"
        type="date"
      />
      <label>Time</label>
      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="input-field"
        type="time"
      />
      <label>Theater</label>
      <input
        value={theater}
        onChange={(e) => setTheater(e.target.value)}
        className="input-field"
        type="text"
      />
    </Modal>
    
    </>
  );
};

export default TicketPage;
