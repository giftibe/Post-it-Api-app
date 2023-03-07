const express = require('express');
const app = express();

const port = process.env.port || 6969;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
