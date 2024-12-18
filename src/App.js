import React, { useState } from "react";
import mockData from "./Data";
import './App.css';

function App() {
  // State to store all items, filters, modal data, and sorting order
  const [items, setItems] = useState(mockData);
  const [filterCategory, setFilterCategory] = useState(""); // Category filter
  const [filterEngagement, setFilterEngagement] = useState([0, Infinity]); // Engagement range filter
  const [modalData, setModalData] = useState(null); // Data for the modal
  const [sortOrder, setSortOrder] = useState({
    engagement: "asc",
    reach: "asc",
  });

  // Function to calculate engagement score from likes, shares, and comments
  const calculateEngagementScore = (likes, shares, comments) =>
    likes + shares + comments;

  // Function to calculate reach using followers and engagement score
  const calculateReach = (followers, engagement) =>
    (followers * engagement) / 100;

  // Handle category filtering
  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
  };

  // Handle engagement range filtering
  const handleEngagementFilter = (range) => {
    const [min, max] = range;
    setFilterEngagement([Number(min) || 0, Number(max) || Infinity]);
  };

  // Sorting logic for engagement and reach
  const handleSort = (key) => {
    const order = sortOrder[key] === "asc" ? "desc" : "asc";

    const sortedItems = [...items].sort((a, b) => {
      const valueA =
        key === "engagement"
          ? calculateEngagementScore(a.likes, a.shares, a.comments)
          : calculateReach(
              a.followers,
              calculateEngagementScore(a.likes, a.shares, a.comments)
            );

      const valueB =
        key === "engagement"
          ? calculateEngagementScore(b.likes, b.shares, b.comments)
          : calculateReach(
              b.followers,
              calculateEngagementScore(b.likes, b.shares, b.comments)
            );

      return order === "asc" ? valueA - valueB : valueB - valueA;
    });

    setItems(sortedItems);
    setSortOrder((prev) => ({ ...prev, [key]: order }));
  };

  // Open modal to show detailed information for a selected item
  const openModal = (item) => {
    setModalData(item);
  };

  // Close modal
  const closeModal = () => {
    setModalData(null);
  };

  // Apply filters to items
  const filteredItems = items
    .filter(
      (item) =>
        (!filterCategory || item.category === filterCategory) &&
        calculateEngagementScore(item.likes, item.shares, item.comments) >=
          filterEngagement[0] &&
        calculateEngagementScore(item.likes, item.shares, item.comments) <=
          filterEngagement[1]
    )
    .map((item) => (
      <div className="card" key={item.name}>
        <h3>{item.name}</h3>
        <p>
          <strong>Engagement Score:</strong>{" "}
          {calculateEngagementScore(item.likes, item.shares, item.comments)}
        </p>
        <p>
          <strong>Reach:</strong>{" "}
          {calculateReach(
            item.followers,
            calculateEngagementScore(item.likes, item.shares, item.comments)
          )}
        </p>
        <p>
          <strong>Category:</strong> {item.category}
        </p>
        <p>
          <strong>Location:</strong> {item.location}
        </p>
        <button onClick={() => openModal(item)}>View Details</button>
      </div>
    ));

  return (
    <div className="dashboard">
      <center>
        <h1>Data Dashboard</h1>
      </center>

      {/* Filter and Sort Options */}
      <div className="filters">
        <select onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="number"
          placeholder="Min Engagement"
          onChange={(e) =>
            handleEngagementFilter([e.target.value, filterEngagement[1]])
          }
        />
        <input
          type="number"
          placeholder="Max Engagement"
          onChange={(e) =>
            handleEngagementFilter([filterEngagement[0], e.target.value])
          }
        />

        <button onClick={() => handleSort("engagement")}>
          Sort by Engagement ({sortOrder.engagement === "asc" ? "↑" : "↓"})
        </button>
        <button onClick={() => handleSort("reach")}>
          Sort by Reach ({sortOrder.reach === "asc" ? "↑" : "↓"})
        </button>
      </div>

      {/* Render Cards */}
      <div className="cards-container">{filteredItems}</div>

      {/* Modal for Detailed View */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalData.name}</h2>
            <p>
              <strong>Engagement Score:</strong>{" "}
              {calculateEngagementScore(
                modalData.likes,
                modalData.shares,
                modalData.comments
              )}
            </p>
            <p>
              <strong>Reach:</strong>{" "}
              {calculateReach(
                modalData.followers,
                calculateEngagementScore(
                  modalData.likes,
                  modalData.shares,
                  modalData.comments
                )
              )}
            </p>
            <p>
              <strong>Category:</strong> {modalData.category}
            </p>
            <p>
              <strong>Location:</strong> {modalData.location}
            </p>
            <p>
              <strong>Likes:</strong> {modalData.likes}
            </p>
            <p>
              <strong>Shares:</strong> {modalData.shares}
            </p>
            <p>
              <strong>Comments:</strong> {modalData.comments}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
