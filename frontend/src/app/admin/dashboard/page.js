"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import api from "../../../utils/axios";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("clients");

  // --- Clients & Projects States ---
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ userId: "", projectName: "", requestDetails: "" });
  
  // --- Portfolio States ---
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({ _id: null, title: "", description: "", techStack: "", image: null, githubLink: "", liveLink: "" });
  const [uploading, setUploading] = useState(false);

  // --- Service States ---
  const [services, setServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [newService, setNewService] = useState({ _id: null, title: "", description: "" });

  // --- Contact States ---
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
    } else {
      fetchProjects();
      fetchUsers();
      fetchPortfolioItems();
      fetchServices();
      fetchContacts();
    }
  }, [user]);

  // --- Data Fetching ---
  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPortfolioItems = async () => {
    try {
      const res = await api.get("/portfolio");
      setPortfolioItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contact");
      setContacts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Client Projects Logic ---
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", newProject);
      setShowModal(false);
      setNewProject({ userId: "", projectName: "", requestDetails: "" });
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProject = async (projectId, field, value) => {
    try {
      await api.put(`/projects/${projectId}`, { [field]: value });
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  // --- Portfolio Logic ---
  const handleSavePortfolio = async (e) => {
    e.preventDefault();
    if (!newPortfolio._id && !newPortfolio.image) {
      alert("Please select an image");
      return;
    }
    
    setUploading(true);
    const formData = new FormData();
    formData.append("title", newPortfolio.title);
    formData.append("description", newPortfolio.description);
    formData.append("techStack", newPortfolio.techStack);
    if (newPortfolio.image) formData.append("image", newPortfolio.image);
    if (newPortfolio.githubLink) formData.append("githubLink", newPortfolio.githubLink);
    if (newPortfolio.liveLink) formData.append("liveLink", newPortfolio.liveLink);

    try {
      if (newPortfolio._id) {
        await api.put(`/portfolio/${newPortfolio._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Portfolio project updated!");
      } else {
        await api.post("/portfolio", formData, { headers: { "Content-Type": "multipart/form-data" } });
        alert("Portfolio project added!");
      }
      setShowPortfolioModal(false);
      setNewPortfolio({ _id: null, title: "", description: "", techStack: "", image: null, githubLink: "", liveLink: "" });
      fetchPortfolioItems();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Operation failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePortfolio = async (id) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      try {
        await api.delete(`/portfolio/${id}`);
        fetchPortfolioItems();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditPortfolio = (item) => {
    setNewPortfolio({
      _id: item._id,
      title: item.title,
      description: item.description,
      techStack: item.techStack,
      githubLink: item.githubLink,
      liveLink: item.liveLink,
      image: null
    });
    setShowPortfolioModal(true);
  };

  // --- Services Logic ---
  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      if (newService._id) {
        await api.put(`/services/${newService._id}`, newService);
        alert("Service updated successfully!");
      } else {
        await api.post("/services", newService);
        alert("Service added successfully!");
      }
      setShowServiceModal(false);
      setNewService({ _id: null, title: "", description: "" });
      fetchServices();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDeleteService = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditService = (service) => {
    setNewService(service);
    setShowServiceModal(true);
  };

  // --- Contact Logic ---
  const handleUpdateContactStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const newContactsCount = contacts.filter((c) => c.status === "new").length;

  if (!user || user.role !== "admin") return null;

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === "clients" ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}
          >
            Client Projects
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === "portfolio" ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}
          >
            Portfolio Management
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === "services" ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}
          >
            Services Management
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`relative px-4 py-2 font-semibold rounded-lg transition-colors ${activeTab === "contacts" ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}
          >
            Contact Messages
            {newContactsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {newContactsCount}
              </span>
            )}
          </button>
        </div>

        {/* --- CLIENTS TAB --- */}
        {activeTab === "clients" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Client Projects</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-zinc-200 transition-colors"
              >
                Create Client Project
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4">User</th>
                    <th className="p-4">Project Name</th>
                    <th className="p-4">Investment</th>
                    <th className="p-4">Deal Status</th>
                    <th className="p-4">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <div>{project.user?.name}</div>
                        <div className="text-sm text-zinc-500">{project.user?.email}</div>
                      </td>
                      <td className="p-4">{project.projectName}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={project.investmentAmount}
                          onChange={(e) => handleUpdateProject(project._id, "investmentAmount", e.target.value)}
                          onBlur={(e) => handleUpdateProject(project._id, "investmentAmount", e.target.value)}
                          className="w-24 bg-black/50 border border-white/10 rounded px-2 py-1 text-white"
                        />
                      </td>
                      <td className="p-4">
                        <select
                          value={project.projectStatus}
                          onChange={(e) => handleUpdateProject(project._id, "projectStatus", e.target.value)}
                          className="bg-black border border-white/10 rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <select
                          value={project.paymentStatus}
                          onChange={(e) => handleUpdateProject(project._id, "paymentStatus", e.target.value)}
                          className={`bg-black border border-white/10 rounded px-2 py-1 ${project.paymentStatus === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PORTFOLIO TAB --- */}
        {activeTab === "portfolio" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Portfolio Items</h2>
              <button
                onClick={() => {
                  setNewPortfolio({ _id: null, title: "", description: "", techStack: "", image: null, githubLink: "", liveLink: "" });
                  setShowPortfolioModal(true);
                }}
                className="bg-white/10 text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Add Portfolio Item
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div key={item._id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="h-40 bg-zinc-800 rounded-lg mb-4 overflow-hidden">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{item.description}</p>
                  <div className="flex space-x-3">
                    <button onClick={() => openEditPortfolio(item)} className="bg-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">Edit</button>
                    <button onClick={() => handleDeletePortfolio(item._id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SERVICES TAB --- */}
        {activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Services</h2>
              <button
                onClick={() => {
                  setNewService({ _id: null, title: "", description: "" });
                  setShowServiceModal(true);
                }}
                className="bg-white/10 text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Add Service
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service._id} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6">{service.description}</p>
                  <div className="flex space-x-3">
                    <button onClick={() => openEditService(service)} className="bg-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition">Edit</button>
                    <button onClick={() => handleDeleteService(service._id)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/30 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CONTACTS TAB --- */}
        {activeTab === "contacts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contact Messages</h2>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> New
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span> Read
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Replied
                </span>
              </div>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-20 text-zinc-500">
                <div className="text-5xl mb-4">📭</div>
                <p>No contact messages yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`bg-white/5 border rounded-2xl p-6 transition cursor-pointer hover:bg-white/8 ${
                      contact.status === "new"
                        ? "border-red-500/30"
                        : contact.status === "replied"
                        ? "border-green-500/20"
                        : "border-white/10"
                    }`}
                    onClick={() => setSelectedContact(contact._id === selectedContact ? null : contact._id)}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-4">
                        {/* Status dot */}
                        <div className="mt-1.5">
                          {contact.status === "new" && <span className="w-2.5 h-2.5 rounded-full bg-red-500 block animate-pulse"></span>}
                          {contact.status === "read" && <span className="w-2.5 h-2.5 rounded-full bg-blue-400 block"></span>}
                          {contact.status === "replied" && <span className="w-2.5 h-2.5 rounded-full bg-green-500 block"></span>}
                        </div>

                        <div>
                          <div className="font-semibold text-lg">{contact.name}</div>
                          <div className="text-zinc-400 text-sm">{contact.email}</div>
                          <div className="text-zinc-500 text-xs mt-1">
                            {new Date(contact.createdAt).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={contact.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleUpdateContactStatus(contact._id, e.target.value)}
                          className={`text-sm border rounded-lg px-3 py-1.5 bg-black focus:outline-none transition ${
                            contact.status === "new"
                              ? "border-red-500/40 text-red-400"
                              : contact.status === "replied"
                              ? "border-green-500/40 text-green-400"
                              : "border-blue-400/40 text-blue-300"
                          }`}
                        >
                          <option value="new">🔴 New</option>
                          <option value="read">🔵 Read</option>
                          <option value="replied">🟢 Replied</option>
                        </select>

                        <a
                          href={`mailto:${contact.email}?subject=Re: Your message&body=Hi ${contact.name},%0D%0A%0D%0A`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg transition font-medium"
                        >
                          Reply ↗
                        </a>
                      </div>
                    </div>

                    {/* Expanded message */}
                    {selectedContact === contact._id && (
                      <div className="mt-5 pt-5 border-t border-white/10">
                        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Message</div>
                        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- MODALS --- */}

        {/* Client Project Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Create New Client Project</h2>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <select
                  value={newProject.userId}
                  onChange={(e) => setNewProject({ ...newProject, userId: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  required
                >
                  <option value="">Select User</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.projectName}
                  onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <textarea
                  placeholder="Request Details"
                  value={newProject.requestDetails}
                  onChange={(e) => setNewProject({ ...newProject, requestDetails: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 h-32"
                  required
                />
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 rounded-xl text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-2 rounded-xl font-semibold"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Portfolio Modal */}
        {showPortfolioModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-y-auto py-10">
            <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-white/10 my-auto">
              <h2 className="text-2xl font-bold mb-6">{newPortfolio._id ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
              <form onSubmit={handleSavePortfolio} className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newPortfolio.title}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <input
                  type="text"
                  placeholder="Tech Stack (e.g., React, Node, MongoDB)"
                  value={newPortfolio.techStack}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, techStack: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <input
                  type="url"
                  placeholder="GitHub Link (Optional)"
                  value={newPortfolio.githubLink}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, githubLink: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                />
                <input
                  type="url"
                  placeholder="Live Project Link (Optional)"
                  value={newPortfolio.liveLink}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, liveLink: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                />
                <textarea
                  placeholder="Description"
                  value={newPortfolio.description}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 h-32"
                  required
                />
                <div className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                  <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, image: e.target.files[0] })}
                      className="hidden"
                      {...(!newPortfolio._id ? { required: true } : {})}
                    />
                  </label>
                  <span className="text-zinc-400 text-sm truncate ml-4">
                    {newPortfolio.image ? newPortfolio.image.name : (newPortfolio._id ? "Leave empty to keep image" : "No image selected")}
                  </span>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPortfolioModal(false)}
                    className="px-6 py-2 rounded-xl text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-white text-black px-6 py-2 rounded-xl font-semibold disabled:opacity-50"
                  >
                    {uploading ? "Saving..." : (newPortfolio._id ? "Save Changes" : "Add Item")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-white/10">
              <h2 className="text-2xl font-bold mb-6">{newService._id ? 'Edit Service' : 'Add Service'}</h2>
              <form onSubmit={handleSaveService} className="space-y-4">
                <input
                  type="text"
                  placeholder="Service Title"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <textarea
                  placeholder="Service Description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 h-32"
                  required
                />
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowServiceModal(false)}
                    className="px-6 py-2 rounded-xl text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-white text-black px-6 py-2 rounded-xl font-semibold"
                  >
                    {newService._id ? "Save Changes" : "Add Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
