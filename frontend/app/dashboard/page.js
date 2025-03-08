"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  createTicket,
  updateTicketStatus,
} from "@/src/redux/slices/ticketSlice";
import { logout } from "@/src/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import TicketModal from "@/components/TicketModal";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((state) => state.tickets);
  const [search, setSearch] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "", description: "" });
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const parseJwt = (token) => {
    try {
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(escape(window.atob(base64)));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    if (tickets) {
      setFilteredTickets(
        tickets.filter((ticket) =>
          ticket.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, tickets]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const decodedUser = token ? parseJwt(token) : null;
      setUserData(decodedUser);
    }
  }, []);

  const openTickets = tickets?.filter(
    (t) => t.status.toLowerCase() === "open"
  ).length;
  const inProgressTickets = tickets?.filter(
    (t) => t.status.toLowerCase() === "in progress"
  ).length;
  const closedTickets = tickets?.filter(
    (t) => t.status.toLowerCase() === "closed"
  ).length;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleCreateTicket = () => {
    dispatch(createTicket(newTicket));
    setNewTicket({ title: "", description: "" });
    setIsModalOpen(false);
  };

  const handleStatusChange = async (ticketId, status) => {
    try {
      await dispatch(updateTicketStatus({ ticketId, status })).unwrap();
      dispatch(fetchTickets()); // Refresh the tickets list
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  const userTickets =
    userData?.role === "admin"
      ? tickets
      : tickets.filter((ticket) => ticket.user === userData?._id);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <section className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="text-lg font-semibold text-gray-700">
            {userData ? `Welcome, ${userData.role}` : "Loading..."}
          </div>
          {userData?.role !== "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
            >
              Add Ticket
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </section>
      </header>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Open Tickets</h3>
          <p className="text-4xl font-bold text-green-600">{openTickets}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">In Progress</h3>
          <p className="text-4xl font-bold text-yellow-500">{inProgressTickets}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Closed Tickets</h3>
          <p className="text-4xl font-bold text-red-600">{closedTickets}</p>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Loading tickets...
          </div>
        ) : filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white shadow-lg rounded-lg p-6 space-y-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800">{ticket.title}</h3>
              <p className="text-gray-600">{ticket.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold ${
                    ticket.status.toLowerCase() === "open"
                      ? "text-green-600"
                      : ticket.status.toLowerCase() === "in progress"
                      ? "text-yellow-500"
                      : "text-red-600"
                  }`}
                >
                  {ticket.status}
                </span>
                {userData?.role === "admin" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(ticket._id, "Open")}
                      className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-all"
                    >
                      Open
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(ticket._id, "In Progress")
                      }
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-all"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(ticket._id, "Closed")}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No tickets found
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
        newTicket={newTicket}
        setNewTicket={setNewTicket}
      />
    </div>
  );
}