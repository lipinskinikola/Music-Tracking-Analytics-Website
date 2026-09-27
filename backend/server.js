const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/artists', require('./routes/artists'));
app.use('/albums', require('./routes/albums'));
app.use('/songs', require('./routes/songs'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
