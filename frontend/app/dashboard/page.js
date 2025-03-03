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
  const [userData, setUserData] = useState(null); // Store user data safely

  const router = useRouter();

  // Function to decode JWT safely on the client side
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
    // Ensure this only runs on the client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const decodedUser = token ? parseJwt(token) : null;
      setUserData(decodedUser);
    }
  }, []); // Run once when the component mounts

  const openTickets = tickets?.filter(
    (t) => t.status.toLowerCase() === "open"
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

  const handleStatusChange = (ticketId, status) => {
    dispatch(updateTicketStatus({ ticketId, status }));
  };

  const userTickets =
    userData?.role === "admin"
      ? tickets
      : tickets.filter((ticket) => ticket.user === userData?._id);

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <section className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="text-lg font-semibold text-gray-700">
            {userData ? `Welcome, ${userData.role}` : "Loading..."}
          </div>
          {userData?.role !== "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-3 hover:bg-blue-700"
            >
              Add Ticket
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </section>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-black">Total Tickets</h3>
          <p className="text-2xl font-bold text-blue-600">{tickets.length}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-600">Open Tickets</h3>
          <p className="text-2xl font-bold text-green-600">{openTickets}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-600">
            Closed Tickets
          </h3>
          <p className="text-2xl font-bold text-red-600">{closedTickets}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-2 w-full md:w-1/3"
      />

      <div className="border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading tickets...</div>
        ) : (
          <table className="w-full border-collapse bg-white shadow-lg">
            <thead className="bg-gray-500">
              <tr>
                <th className="border p-3 text-left">Title</th>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-left">Status</th>
                {userData?.role === "admin" && (
                  <th className="border p-3 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b hover:bg-gray-50">
                    <td className="border p-3 text-black">{ticket.title}</td>
                    <td className="border p-3 text-black">
                      {ticket.description}
                    </td>
                    <td
                      className={`border p-3 font-semibold ${
                        ticket.status.toLowerCase() === "open"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ticket.status}
                    </td>
                    {userData?.role === "admin" && (
                      <td className="border p-3">
                        <button
                          onClick={() => handleStatusChange(ticket._id, "open")}
                          className="bg-green-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-green-700"
                        >
                          Open
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(ticket._id, "closed")
                          }
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
                        >
                          Close
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={userData?.role === "admin" ? 4 : 3}
                    className="text-center text-gray-500 p-4"
                  >
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

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
