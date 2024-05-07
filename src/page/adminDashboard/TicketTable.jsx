import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteTicket, getAllTicket, updateTicketFromAdmin } from "../../api";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { checkIfTokenIsValid } from "../../helper";
import { ThemeContext } from "../../ThemeContext";
function TicketTable() {

  //email: admin@gmail.com -- psw: admin1
  
 const adminId = 'pDmkvL201nZWWgrEYnIHxyBBBIu1' ;

  const nav = useNavigate();
  useEffect(() => {
    if (!checkIfTokenIsValid()) {
      nav("/login");
    }
  }, [nav]);

  const { isLightMode } = useContext(ThemeContext);
  const { search } = useLocation();   //lejon te futesh ne url
  const queryParams = new URLSearchParams(search); //krijojme nje objekt te ri 
  const movieId = queryParams.get('movieId');  //merr vleren e parametrit dhe i kalon variablit 
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (userId !== adminId) {
      nav("/unauthorized");
    }
  }, [userId]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allTicket"],
    queryFn: getAllTicket,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userIdInput, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movieIdInput, setMovieId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [theater, setTheater] = useState("");

 
    const updateMutation = useMutation({
      mutationFn: updateTicketFromAdmin,
      onSuccess: () => {
        refetch();
        toast("Ticket is updated!");
      },
      onError: (error) => {
        toast.error("An error occurred: " + error.message);
        console.log(error);
      },
    });

    const handleOk = () => {
      updateMutation.mutate({
        id: selectedTicket.id,
        ticketChange: {
          userId: selectedTicket.user_id,
          name,
          email,
          movieId: selectedTicket.movie_id,
          date,
          time,
          theater,
        },
      });
      refetch();
      setIsModalOpen(false);
    };
 

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      refetch();
      toast("Ticket is deleted!");
    },
    onError: () => {
      toast("Something went wrong");
    },
  });

  const columns = [
    {
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Movie Id",
      key: "movie_id",
      dataIndex: "movie_id",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Theater",
      key: "theater",
      dataIndex: "theater",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the ticket"
            description="Are you sure to delete this task?"
            onConfirm={() => mutation.mutate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <IoTrashBinSharp size={"20px"} style={{ color: "red" }} />
          </Popconfirm>

          <a
            onClick={() => {
              setSelectedTicket(record);
              setIsModalOpen(true);
              refetch();
            }}
          >
            <FaRegEdit style={{ color: "blue" }} size={"20px"} />
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setUserId(selectedTicket?.user_id);
    setName(selectedTicket?.name);
    setEmail(selectedTicket?.email);
    console.log("selectedTicket?.movie_id:", selectedTicket?.movie_id);
    setMovieId(selectedTicket?.movie_id);
    setDate(selectedTicket?.date);
    setTime(selectedTicket?.time);
    setTheater(selectedTicket?.theater);
  }, [selectedTicket]);

  return (
    <div style={{
      background: isLightMode ? "white" : "#eceff1" }}>
      <section style={{ textAlign: "center" }}>
        <h1>Welcome to the Admin Dashboard!</h1>
        <p>Manage your site efficiently!</p>
      </section>
      <div className="ticket-table-container">
        <Button
          style={{ backgroundColor: "green" }}
          onClick={() => {
            nav("/reservation");
          }}
        >
          Add new Ticket+
        </Button>
        <Table
          loading={isLoading || mutation.isPending || updateMutation.isPending}
          columns={columns}
          dataSource={data}
          className="edit-table"
        />
        ;
        <Modal
          title={selectedTicket?.id || ""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Update"
        >
          <label htmlFor="userId">User Id</label>
          <input
            id="userId"
            style={{ width: "100%" }}
            type="text"
            value={userId}
            disabled
          />
          <label htmlFor="name">Name</label>
          <input
            onChange={(event) => setName(event.target.value)}
            id="name"
            style={{ width: "100%" }}
            type="text"
            value={name}
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            id="email"
            style={{ width: "100%" }}
            type="email"
            value={email}
          />
          <label htmlFor="movieId">Movie Id</label>
          <input
            onChange={(event) => {
              setMovieId(event.target.value);
            }}
            id="movieId"
            style={{ width: "100%" }}
            type="text"
            defaultValue={selectedTicket?.movie_id}
          />
          <label htmlFor="date">Date</label>
          <input
            onChange={(event) => setDate(event.target.value)}
            id="date"
            type="date"
            value={date}
          />
          <label htmlFor="time">Time</label>
          <input
            onChange={(event) => setTime(event.target.value)}
            id="time"
            type="time"
            value={time}
          />
          <label htmlFor="theater">Theater</label>
          <input
            onChange={(event) => setTheater(event.target.value)}
            id="theater"
            style={{ width: "100%" }}
            type="text"
            value={theater}
          />
        </Modal>
      </div>
      ;
    </div>
  );
}

export default TicketTable;
