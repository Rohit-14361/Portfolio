"use client";

import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Link from "next/link";
import { services as staticServices } from "../data/data";

export default function ServicesSection({ limit }) {
  const [services, setServices] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoaded(true);
      }
    };
    fetchServices();
  }, []);

  // Use dynamic services from DB if available, else fall back to static list
  const sourceServices = loaded && services.length > 0 ? services : staticServices;
  const displayedServices = limit ? sourceServices.slice(0, limit) : sourceServices;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-white" id="services">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">
          Services I Provide
        </h2>
        {limit && sourceServices.length > limit && (
          <Link 
            href="/services" 
            className="inline-block bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
          >
            Explore All Services →
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedServices.map((service, idx) => (
          <div
            key={service._id || service.title || idx}
            className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-5">
                {service.title}
              </h3>

              <p className="text-zinc-400 leading-7 mb-8">
                {service.description}
              </p>
            </div>
            
            <a 
              href="/contact" 
              className="inline-block mt-auto bg-white text-black text-center font-semibold py-3 px-6 rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Enquire Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}