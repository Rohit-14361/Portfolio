"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import api from "../../utils/axios";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", { projectName, requestDetails });
      setShowModal(false);
      setProjectName("");
      setRequestDetails("");
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async (project) => {
    try {
      const orderRes = await api.post("/payments/create-order", { projectId: project._id });
      const orderData = orderRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Rohit Kumar Portfolio",
        description: `Payment for ${project.projectName}`,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              projectId: project._id,
            });
            alert("Payment successful!");
            fetchProjects();
          } catch (verifyError) {
            alert(verifyError.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  if (!user) return null;

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">User Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black px-6 py-2 rounded-xl font-semibold"
          >
            Request New Project
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Request Project</h2>
              <form onSubmit={handleRequestProject} className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
                  required
                />
                <textarea
                  placeholder="Project Details & Requirements"
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
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
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {projects.length === 0 ? (
            <p className="text-zinc-400">You have no projects yet.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold mb-2">{project.projectName}</h2>
                <p className="text-zinc-400 mb-4">{project.requestDetails}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-zinc-500">Investment</p>
                    <p className="font-semibold">₹{project.investmentAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Deal Status</p>
                    <p className="font-semibold capitalize">{project.projectStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Payment Status</p>
                    <p className={`font-semibold capitalize ${project.paymentStatus === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {project.paymentStatus}
                    </p>
                  </div>
                </div>
                {project.paymentStatus === "pending" && project.investmentAmount > 0 && (
                  <button
                    onClick={() => handlePayment(project)}
                    className="bg-white text-black px-6 py-2 rounded-xl font-semibold"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
