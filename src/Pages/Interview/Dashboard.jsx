import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="p-6">
      {/* Username Display */}
      {user && (
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, <span className="text-blue-500">{user.username}</span>!
        </h2>
      )}

      {/* Overview Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold">0</h3>
          <p className="text-sm">Total Interviews</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">0</h3>
          <p className="text-sm">Average Score</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">0</h3>
          <p className="text-sm">Target Score</p>
        </div>
      </div>

      {/* Completed Interviews */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">Completed Interviews</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-gray-600">Date</th>
              <th className="p-2 text-gray-600">Role</th>
              <th className="p-2 text-gray-600">Company</th>
              <th className="p-2 text-gray-600">Score</th>
              <th className="p-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-gray-500" colSpan="5">
                No completed interviews yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* All Interviews */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">All Interviews</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-gray-600">Role</th>
              <th className="p-2 text-gray-600">Company</th>
              <th className="p-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-gray-500" colSpan="3">
                No interviews scheduled yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
