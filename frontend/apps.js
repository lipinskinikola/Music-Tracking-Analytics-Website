const API = "http://localhost:5001";


// LOAD
async function loadArtists() {
    const res = await fetch(`${API}/artists`);
    const data = await res.json();

    const table = document.getElementById("artistTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.artist_id}</td>
                <td>${a.artist_name}</td>
                <td>${a.genre}</td>
                <td>${a.monthly_listeners}</td>
                <td><button onclick="deleteArtist(${a.artist_id})">Delete</button></td>
            </tr>
        `;
    });
}

// CREATE
async function createArtist() {
    await fetch(`${API}/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            artist_name: document.getElementById("name").value,
            genre: document.getElementById("genre").value,
            monthly_listeners: document.getElementById("listeners").value
        })
    });

    loadArtists();
}

// DELETE
async function deleteArtist(id) {
    await fetch(`${API}/artists/${id}`, {
        method: "DELETE"
    });

    loadArtists();
}




// LOAD
async function loadAlbums() {
    const res = await fetch(`${API}/albums`);
    const data = await res.json();

    const table = document.getElementById("albumTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.album_id}</td>
                <td>${a.album_name}</td>
                <td>${a.release_year}</td>
                <td>${a.number_of_listens}</td>
                <td>${a.artist_id}</td>
            </tr>
        `;
    });
}

// CREATE
async function createAlbum() {
    await fetch(`${API}/albums`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            album_name: document.getElementById("album_name").value,
            release_year: document.getElementById("release_year").value,
            number_of_listens: document.getElementById("album_listens").value,
            artist_id: document.getElementById("album_artist_id").value
        })
    });

    loadAlbums();
}




// LOAD
async function loadSongs() {
    const res = await fetch(`${API}/songs`);
    const data = await res.json();

    const table = document.getElementById("songTable");
    table.innerHTML = "";

    data.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.song_id}</td>
                <td>${s.song_name}</td>
                <td>${s.release_year}</td>
                <td>${s.album_id}</td>
            </tr>
        `;
    });
}

// CREATE
async function createSong() {
    await fetch(`${API}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            song_name: document.getElementById("song_name").value,
            release_year: document.getElementById("song_year").value,
            album_id: document.getElementById("song_album_id").value
        })
    });

    loadSongs();
}


loadArtists();
loadAlbums();
loadSongs();


