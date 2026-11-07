
const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie_booking"
});

app.post("/book", async (req, res) => {
    try {
        const {
            name, email, movie, theatre,
            date, time, seats
        } = req.body;

        if (!name || !email || !movie || !theatre ||
            !date || !time || !Number.isInteger(seats) ||
            seats < 1 || seats > 10) {
            return res.status(400).json({
                message: "Please enter valid booking details."
            });
        }

        const [movieRows] = await db.execute(
            "SELECT movie_id FROM movies WHERE title = ?",
            [movie]
        );

        if (movieRows.length === 0) {
            return res.status(400).json({
                message: "Movie not found."
            });
        }

        const [showRows] = await db.execute(
            `SELECT show_id, ticket_price FROM shows
             WHERE movie_id = ? AND theatre_name = ?
             AND show_date = ? AND show_time = ?`,
            [movieRows[0].movie_id, theatre, date, time]
        );

        if (showRows.length === 0) {
            return res.status(400).json({
                message: "This show is not available. Choose a listed show."
            });
        }

        const show = showRows[0];
        const total = Number(show.ticket_price) * seats;

        const [userRows] = await db.execute(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );

        let userId;

        if (userRows.length > 0) {
            userId = userRows[0].user_id;

            await db.execute(
                "UPDATE users SET user_name = ? WHERE user_id = ?",
                [name, userId]
            );
        } else {
            const [userResult] = await db.execute(
                "INSERT INTO users (user_name, email) VALUES (?, ?)",
                [name, email]
            );

            userId = userResult.insertId;
        }

        const [bookingResult] = await db.execute(
            `INSERT INTO bookings
             (user_id, show_id, seats, total_amount, booking_status)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, show.show_id, seats, total, "Confirmed"]
        );

        res.json({
            bookingId: bookingResult.insertId,
            total: total
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error. Please try again."
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
