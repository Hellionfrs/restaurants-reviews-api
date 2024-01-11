CREATE DATABASE "express-reviews";
-- Tabla Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user'))
);

-- Tabla Restaurants
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- Tabla Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    restaurantId INTEGER NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 5),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
);
