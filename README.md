# 🥗 Mindful-Meals-Backend

Mindful Meals is a full-stack web application that helps users find and save restaurants that match their dietary needs, such as vegan, gluten-free, and allergy-friendly options.

This project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and leverages the Yelp Fusion API to provide real-time restaurant data.

🛠 Frontend React app setup in separate repo: https://github.com/Liliyalexx/Mindful-Meals


## 🚀 MVP Features

- JWT-based user registration & login
- Search restaurants by location + dietary tags (Yelp API)
- Save favorite restaurants
- Write, edit, and delete personal reviews
- View and manage everything on a user dashboard



## 📦 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **Authentication:** JSON Web Tokens (JWT)
- **API Integration:** Yelp Fusion API
- **Deployment:** Heroku



## ⚙️ SetUp Instructions:

Follow these steps to run the Mindful Meals backend locally.

1. Clone the Repo
2. Install Dependencies with `npm install`
3. Add Environment Variables
    - Create a .env file in the root directory:

        `touch .env`
    - See `.env.example` file to copy with your own credentials
4. Start the server `npm start`



## ROUTES
## 🔑 Authentication
### `POST /api/auth/register`  
Register a new user.

**Body:**
```json
{
  "username": "testuser",
  "password": "123456"
}
```

### `POST /api/auth/login`
Login and receive JWT token.

**Body:**

```json
{
  "username": "testuser",
  "password": "123456"
}
```
**Response:**

```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "username": "testuser"
  }
}
```

## 📦 Saved Restaurants
All routes below require:

```
Authorization: Bearer <your-token>
```

### `GET /api/saved`
Get all saved restaurants for the logged-in user.

### `POST /api/saved`
Save a new restaurant.

```json
{
  "yelpId": "abc123",
  "name": "Green Earth Cafe",
  "address": "123 Plant Blvd",
  "imageUrl": "https://imgurl.com/photo.jpg",
  "rating": 4.7,
  "categories": ["vegan", "gluten-free"]
}
```

### `DELETE /api/saved/:id`
Delete a saved restaurant by its ID.

## ✍️ Reviews
All routes below require:

```
Authorization: Bearer <your-token>
```

### `POST /api/reviews`
Create a review for a saved restaurant.

```json
{
  "restaurantId": "savedRestaurantObjectId",
  "rating": 5,
  "comment": "Fantastic service!",
  "customTags": ["gluten-free", "quiet"]
}
```

### `GET /api/reviews/restaurant/:restaurantId`
Get the logged-in user's review for a specific restaurant.

### `PUT /api/reviews/restaurant/:restaurantId`
Edit your review for a restaurant.

Body:

```json
{
  "rating": 4,
  "comment": "Good food, long wait",
  "customTags": ["busy", "cozy"]
}
```

### `DELETE /api/reviews/:reviewId`
Delete a review by its ID.