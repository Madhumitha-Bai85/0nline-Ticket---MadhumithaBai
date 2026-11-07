
CREATE DATABASE movie_booking;
USE movie_booking;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    language VARCHAR(30),
    duration INT,
    release_date DATE
);

CREATE TABLE shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    theatre_name VARCHAR(100),
    show_date DATE,
    show_time TIME,
    ticket_price DECIMAL(10,2),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    show_id INT,
    seats INT,
    total_amount DECIMAL(10,2),
    booking_status VARCHAR(30),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (show_id) REFERENCES shows(show_id)
);

INSERT INTO movies
(title, language, duration, release_date)
VALUES
('Pushpa 2', 'Telugu', 200, '2024-12-05'),
('RRR', 'Telugu', 187, '2022-03-25'),
('Kalki 2898 AD', 'Telugu', 181, '2024-06-27');

INSERT INTO shows
(movie_id, theatre_name, show_date, show_time, ticket_price)
VALUES
(1, 'PVR Cinemas', '2026-11-10', '10:00:00', 200),
(2, 'INOX Cinemas', '2026-11-10', '14:00:00', 180),
(3, 'PVR Cinemas', '2026-11-10', '18:00:00', 220);
