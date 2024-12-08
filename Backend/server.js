const express = require('express');
const app = express();
const mentorRoutes = require('./routes/mentorRoutes'); 
const hobbyistRoutes = require('./routes/hobbyistRoutes'); 

app.use(express.json());

app.use('/mentor', mentorRoutes);
app.use('/hobbyist', hobbyistRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
