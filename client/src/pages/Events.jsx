import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import eventsImage from '../assets/events.jpeg';
import { FaExternalLinkAlt, FaTrash } from 'react-icons/fa';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Delete Event
  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative pt-20 pb-10" style={{ backgroundImage: `url(${eventsImage})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between px-8 mb-8">
          <div className='flex gap-5 items-center'>
          <Sidebar />
          <h1 className="text-5xl font-bold text-white">Events</h1>
          </div>
          <div className='flex'>
          <Link to="/create-event" className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700">
            Create Event
          </Link>
          <Profile />
          </div>
        </div>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event._id} className="relative bg-white p-6 rounded-lg shadow-lg transition transform  hover:scale-105">
                {/* Event Image */}
                {event.image && (
                  <img
                    src={`http://localhost:5000/${event.image}`}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold text-gray-900">{event.title}</h2>
                <p className="text-gray-700 mt-2">{event.description.slice(0, 100)}...</p>

                {/* Hover content */}
<div className="absolute inset-0  opacity-0 text-xl p-10 hover:opacity-100 bg-white bg-opacity-95 transition-opacity flex flex-col justify-between">
  {/* Event Description */}
  <div className="text-gray-800 mb-4">
    <p>{event.description}</p>
  </div>

  {/* Created By */}
  <div className="text-gray-600 mb-4">
    <p className="text-lg font-medium">Created By: <span className="font-semibold text-gray-900">{event.creatorId.name}</span></p>
  </div>

  {/* External Link Button */}
  <a 
    href={event.externalLink} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-flex items-center gap-2 mt-4 text-blue-500 hover:text-blue-700 transition-colors"
  >
    <FaExternalLinkAlt /> Visit Link
  </a>

  {/* Delete Button */}
  <div className="mt-4">
    <button
      onClick={() => handleDelete(event._id)}
      className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
    >
      <FaTrash /> Delete
    </button>
  </div>
</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
