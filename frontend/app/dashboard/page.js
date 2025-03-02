"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "@/src/redux/slices/ticketSlice";
import { logout } from "@/src/redux/slices/authSlice"; // Import logout action
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { tickets, loading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth); // Access the user from auth state
  const [search, setSearch] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTickets());
    console.log("tickets", dispatch(fetchTickets())); // Debugging
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

  const openTickets =
    tickets?.filter((ticket) => ticket.status === "open").length || 0;
  const closedTickets =
    tickets?.filter((ticket) => ticket.status === "closed").length || 0;

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push("/login");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Logout
      </button>

      {/* Ticket Summary Section */}
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

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-2 w-full md:w-1/3"
      />

      {/* Tickets Table */}
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
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="border-b hover:bg-gray-50">
                    <td className="border p-3 text-black">{ticket.title}</td>
                    <td className="border p-3 text-black ">
                      {ticket.description}
                    </td>
                    <td
                      className={`border p-3 font-semibold ${
                        ticket.status === "open"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {ticket.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 p-4">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
