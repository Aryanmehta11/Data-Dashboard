# Filtered Items Showcase

This project is a React application that demonstrates dynamic filtering and rendering of items based on user-defined criteria, such as categories and engagement range.

---

## **Features**
- **Category Filtering**: Filter items by predefined categories (e.g., Tech, Fashion, Sports).
- **Engagement Score Filtering**: Dynamically filter items based on a range of engagement scores.
- **Dynamic Rendering**: Only items matching the selected filters are displayed in the UI.
- **Engagement Score Calculation**: Engagement is calculated based on likes, shares, and comments.
- **Interactive UI**: View detailed information about each item using a modal.

---

## **Getting Started**

### **Prerequisites**
- Node.js (version 16.x or later)
- npm or yarn

### **Installation**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd filtered-items-showcase
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## **Project Structure**
```
filtered-items-showcase/
├── public/            # Static assets
├── src/               # Source code
│   ├── components/    # Reusable components
│   ├── App.js         # Main component
│   ├── index.js       # Application entry point
│   └── styles.css     # Styling
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

---

## **How It Works**

### **Filtering Logic**
The `filter()` method is used to generate a subset of items based on:
1. **Category**:
   - Items are filtered to match the selected category.
   - If "All Categories" is selected, all items pass this filter.
2. **Engagement Range**:
   - Engagement scores are calculated using the formula:
     ```js
     likes + shares + comments
     ```
   - Only items with engagement scores within the specified range pass this filter.

### **Dynamic Rendering**
The filtered items are displayed as cards using the `map()` method. Each card shows:
- Item name
- Engagement score
- Reach
- Category
- Location
- "View Details" button to open a modal.

---

## **Core Components**

### **Filter Controls**
```jsx
<select onChange={(e) => handleCategoryFilter(e.target.value)}>
  <option value="">All Categories</option>
  <option value="Tech">Tech</option>
  <option value="Fashion">Fashion</option>
  <option value="Sports">Sports</option>
</select>

<input
  type="number"
  placeholder="Min Engagement"
  onChange={(e) => handleEngagementFilter([e.target.value, filterEngagement[1]])}
/>
<input
  type="number"
  placeholder="Max Engagement"
  onChange={(e) => handleEngagementFilter([filterEngagement[0], e.target.value])}
/>
```

### **Item Display**
```jsx
filteredItems.map((item) => (
  <div className="card" key={item.name}>
    <h3>{item.name}</h3>
    <p>Engagement Score: {calculateEngagementScore(item.likes, item.shares, item.comments)}</p>
    <p>Reach: {calculateReach(item.followers, calculateEngagementScore(item.likes, item.shares, item.comments))}</p>
    <p>Category: {item.category}</p>
    <p>Location: {item.location}</p>
    <button onClick={() => openModal(item)}>View Details</button>
  </div>
))
```

---

## **Available Scripts**

- **Start**: Run the development server
  ```bash
  npm start
  ```
- **Build**: Create a production build
  ```bash
  npm run build
  ```
- **Test**: Run tests
  ```bash
  npm test
  ```

---

## **Future Enhancements**
- Add support for multiple category selection.
- Include advanced filtering options (e.g., by location or reach).
- Implement backend support for dynamic data fetching.
- Enhance UI with animations and improved accessibility.

---

## **License**
This project is licensed under the MIT License. Feel free to use, modify, and distribute this application.
