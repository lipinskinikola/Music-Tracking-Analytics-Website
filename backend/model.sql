PRAGMA foreign_keys = ON;

CREATE TABLE artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT,
    genre TEXT,
    monthly_listeners INTEGER
);

CREATE TABLE albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_name TEXT,
    release_year INTEGER,
    number_of_listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE
);

CREATE TABLE songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_name TEXT,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(album_id) ON DELETE CASCADE
);
