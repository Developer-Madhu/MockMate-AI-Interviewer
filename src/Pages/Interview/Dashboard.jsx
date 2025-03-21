// import React, { useEffect, useState } from "react";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Retrieve user from localStorage
//     const storedUser = localStorage.getItem("userData");
//     const userscores = localStorage.getItem('userscore')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);
//   const userscores = localStorage.getItem('userscore')
//   const ques = JSON.parse(localStorage.getItem('questionHistory'))


//   return (
//     <div className="p-6">
//       {/* Username Display */}
//       {user && (
//         <h2 className="text-2xl font-semibold mb-4">
//           Welcome, <span className="text-blue-500">{user.username}</span>!
//         </h2>
//       )}

//       <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
//         <div className="text-center">
//           <h3 className="text-3xl font-bold">{ques.length}</h3>
//           <p className="text-sm">Questions Attempted</p>
//         </div>
//         <div className="text-center">
//           <h3 className="text-3xl font-bold">{userscores}</h3>
//           <p className="text-sm">Average Score</p>
//         </div>
//         <div className="text-center">
//           <h3 className="text-3xl font-bold">50</h3>
//           <p className="text-sm">Target Score</p>
//         </div>
//       </div>
//       <br />
//       {/* Completed Interviews */}
//       <div className="flex gap-1 align-middle justify-between">
//         <div className="h-52 w-[50%] bg-blue-500 rounded-2xl">
//           <h2 className="text-white text-center text-2xl font-bold m-2 p-2">Feedback</h2>
//           <hr className="w-screen text-white" />
//         </div>
//         <br />
//         <div className="h-52 w-[50%] bg-blue-500 rounded-2xl">
//           <h2 className="text-white text-center text-2xl font-bold m-2 p-2">Areas of Improvement</h2>
//           <hr className="w-screen text-white" />
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { useAuth } from "../Auth/AuthContext"; // Import Auth Context

const Dashboard = () => {
  const { user } = useAuth(); // Get logged-in user from context

  return (
    <div className="p-6">
      {/* Username Display */}
      {user && (
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, <span className="text-blue-500">{user.username}</span>!
        </h2>
      )}

      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold">{user?.questionHistory?.length || 0}</h3>
          <p className="text-sm">Questions Attempted</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">{user?.score || 0}</h3>
          <p className="text-sm">Average Score</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">50</h3>
          <p className="text-sm">Target Score</p>
        </div>
      </div>
      <br />
      <div className="flex gap-1 align-middle justify-between">
         <div className="h-52 w-[50%] bg-blue-500 rounded-2xl">
           <h2 className="text-white text-center text-2xl font-bold m-2 p-2">Feedback</h2>
           <hr className="w-screen text-white" />
         </div>
         <br />
         <div className="h-52 w-[50%] bg-blue-500 rounded-2xl">
           <h2 className="text-white text-center text-2xl font-bold m-2 p-2">Areas of Improvement</h2>
           <hr className="w-screen text-white" />
         </div>
       </div>
    </div>
  );
};

export default Dashboard;
