import React, { useEffect, useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Token stored after login
        if (!token) {
          console.error("No token found, please login.");
          return;
        }

        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token in headers
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

//   const fields = [
//     { key: "linkedin", label: "LinkedIn" },
//     { key: "github", label: "GitHub" },
//     { key: "leetcode", label: "LeetCode" },
//     { key: "phone", label: "Phone Number" },
//     { key: "resume", label: "Resume" },
//     { key: "website", label: "Website" },
//     { key: "location", label: "Location" },
//     { key: "about", label: "About" },
//   ];

  if (!user) return <p>Loading profile...</p>;

  return (
    
    <div className="profile-container">
      {/* Top Section */}
      <div className="profile-top">
        <div className="profile-pic"></div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="email">{user.email}</p>
        </div>
      </div>
      
      {/* Middle Section - Editable Fields */}
      <div className="profile-middle">
        <div className="details">
          {[
            { key: "about", label: "About" },
            { key: "location", label: "Location" },
            { key: "phone", label: "Phone Number" },
          ].map((field) => (
            <div key={field.key} className="detail-item">
              <strong>{field.label}:</strong>
              <span className="retrived-data">{user[field.key] || `Add ${field.label}`}</span>
              <button className="edit-btn">Edit</button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Section - Social Links */}
      <div className="profile-bottom">
        <h3>Social Links</h3>
        <div className="social-links">
          {[
            { key: "linkedin", label: "LinkedIn" },
            { key: "github", label: "GitHub" },
            { key: "leetcode", label: "LeetCode" },
          ].map((field) => (
            <div key={field.key} className="social-link-item">
              <strong>{field.label}:</strong>
              {user[field.key] ? (
                <a href={user[field.key]} target="_blank" rel="noopener noreferrer">{field.label}</a>
              ) : (
                <span className="placeholder">Add {field.label}</span>
              )}
              <button className="edit-btn">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
