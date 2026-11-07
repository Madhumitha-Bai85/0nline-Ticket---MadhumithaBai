
function selectMovie(movieName) {
    document.getElementById("movie").value = movieName;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("bookingForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let movie = document.getElementById("movie").value;
    let theatre = document.getElementById("theatre").value;
    let seats = Number(document.getElementById("seats").value);

    let prices = {
        "Pushpa 2": 200,
        "RRR": 180,
        "Kalki 2898 AD": 220
    };

    let total = prices[movie] * seats;

    document.getElementById("result").innerHTML = `
        <h2>Booking Successful!</h2>
        <p>Customer: ${name}</p>
        <p>Email: ${email}</p>
        <p>Movie: ${movie}</p>
        <p>Theatre: ${theatre}</p>
        <p>Seats: ${seats}</p>
        <h3>Total Amount: ₹${total}</h3>
        <p>Status: Confirmed</p>
    `;
});
