const db = require('../db');

// GET ALL SONGS
exports.getAll = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// GET ONE SONG
exports.getOne = (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM songs WHERE song_id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Song not found" });
        res.json(row);
    });
};

// CREATE SONG
exports.create = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    db.run(
        "INSERT INTO songs (song_name, release_year, album_id) VALUES (?, ?, ?)",
        [song_name, release_year, album_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                id: this.lastID,
                song_name,
                release_year,
                album_id
            });
        }
    );
};

// UPDATE SONG
exports.update = (req, res) => {
    const { id } = req.params;
    const { song_name, release_year, album_id } = req.body;

    db.run(
        "UPDATE songs SET song_name=?, release_year=?, album_id=? WHERE song_id=?",
        [song_name, release_year, album_id, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Song updated" });
        }
    );
};

// DELETE SONG
exports.remove = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM songs WHERE song_id=?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ message: "Song deleted" });
    });
};
