// TicketModal.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "@/src/redux/slices/ticketSlice";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const TicketModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {
      await dispatch(createTicket({ title, description }));
      toast.success("Ticket created successfully!"); // Show success toast
      onClose(); // Close the modal after submitting
    } catch (error) {
      toast.error("Failed to create ticket."); // Show error toast if needed
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[600px]">
        <h2 className="text-xl font-bold text-black mb-4">Add Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-black">Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md p-2 w-full text-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-full text-gray-500"
              placeholder="Enter ticket description"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Create Ticket
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
