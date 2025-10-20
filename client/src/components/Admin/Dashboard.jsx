import React from "react";

const Dashboard = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 ">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Cards */}
        {["Total Products", "Total Enquiries", "Pending Orders"].map((title, i) => (
          <div 
            key={i} 
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-4">—</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
