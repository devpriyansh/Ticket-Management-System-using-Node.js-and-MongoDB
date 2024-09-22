import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import "./App.css";

// Placeholder API functions (replace with actual API calls)
const API = {
  getTickets: () =>
    fetch("http://localhost:3000/api/tickets").then((res) => res.json()),
  getTicket: (id) =>
    fetch(`http://localhost:3000/api/tickets/${id}`).then((res) => res.json()),
  createTicket: (ticket) =>
    fetch("http://localhost:3000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    }).then((res) => res.json()),
  updateTicket: (id, ticket) =>
    fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    }).then((res) => res.json()),
  deleteTicket: (id) =>
    fetch(`http://localhost:3000/api/tickets/${id}`, { method: "DELETE" }),
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <Link to="/" className="text-2xl font-bold">
              Ticket Management System
            </Link>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
            <Route path="/ticket/:id/edit" element={<EditTicketForm />} />
            <Route path="/create" element={<TicketForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    API.getTickets().then(setTickets);
  }, []);

  const handleDelete = (id) => {
    API.deleteTicket(id).then(() => {
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Link
          to="/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Ticket
        </Link>
      </div>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

function TicketCard({ ticket, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    onDelete(ticket._id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{ticket.title}</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500"
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          <p className="text-gray-600">{ticket.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">
                {ticket.status}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                {ticket.priority}
              </span>
            </div>
            <div className="flex">
              <Link to={`/ticket/${ticket._id}`} className="text-blue-500 mr-2">
                <Edit size={18} />
              </Link>
              <button onClick={handleDelete} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TicketDetail() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    API.getTicket(id).then(setTicket);
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
      <p className="text-gray-600 mb-4">{ticket.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">
            {ticket.status}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
            {ticket.priority}
          </span>
        </div>
        <Link
          to={`/ticket/${ticket._id}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit Ticket
        </Link>
      </div>
    </div>
  );
}

function EditTicketForm() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
  });

  useEffect(() => {
    // Fetch the ticket to be edited based on the ticket ID
    API.getTicket(id).then(setTicket);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the updateTicket API to save the edited ticket
    API.updateTicket(id, ticket).then(() => {
      // Redirect or give feedback after saving
      alert("Ticket updated successfully!");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Ticket</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={ticket.description}
          onChange={(e) =>
            setTicket({ ...ticket, description: e.target.value })
          }
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          value={ticket.status}
          onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="priority"
        >
          Priority
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="priority"
          value={ticket.priority}
          onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update Ticket
      </button>
    </form>
  );
}
function TicketForm() {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
    createdBy: "User", // This should be replaced with actual user data
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    API.createTicket(ticket).then(() => {
      // Redirect to ticket list after submission
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Create Ticket</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={ticket.description}
          onChange={(e) =>
            setTicket({ ...ticket, description: e.target.value })
          }
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          value={ticket.status}
          onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="priority"
        >
          Priority
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="priority"
          value={ticket.priority}
          onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Create Ticket
      </button>
    </form>
  );
}

export default App;
