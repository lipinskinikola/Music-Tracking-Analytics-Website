const db = require('../db');

// GET ALL ARTISTS
exports.getAll = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET ONE ARTIST
exports.getOne = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM artists WHERE artist_id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Artist not found" });
        res.json(row);
    });
};

// CREATE ARTIST
exports.create = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        "INSERT INTO artists (artist_name, genre, monthly_listeners) VALUES (?, ?, ?)",
        [artist_name, genre, monthly_listeners],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                id: this.lastID,
                artist_name,
                genre,
                monthly_listeners
            });
        }
    );
};

// UPDATE ARTIST
exports.update = (req, res) => {
    const { id } = req.params;
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        "UPDATE artists SET artist_name=?, genre=?, monthly_listeners=? WHERE artist_id=?",
        [artist_name, genre, monthly_listeners, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Artist updated" });
        }
    );
};

// DELETE ARTIST
exports.remove = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM artists WHERE artist_id=?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Artist deleted" });
    });
};
