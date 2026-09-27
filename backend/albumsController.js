const db = require('../db');

// GET ALL ALBUMS
exports.getAll = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET ONE ALBUM
exports.getOne = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM albums WHERE album_id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Album not found" });
        res.json(row);
    });
};

// CREATE ALBUM
exports.create = (req, res) => {
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    db.run(
        "INSERT INTO albums (album_name, release_year, number_of_listens, artist_id) VALUES (?, ?, ?, ?)",
        [album_name, release_year, number_of_listens, artist_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                id: this.lastID,
                album_name,
                release_year,
                number_of_listens,
                artist_id
            });
        }
    );
};

// UPDATE ALBUM
exports.update = (req, res) => {
    const { id } = req.params;
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    db.run(
        "UPDATE albums SET album_name=?, release_year=?, number_of_listens=?, artist_id=? WHERE album_id=?",
        [album_name, release_year, number_of_listens, artist_id, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Album updated" });
        }
    );
};

// DELETE ALBUM
exports.remove = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM albums WHERE album_id=?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Album deleted" });
    });
};
