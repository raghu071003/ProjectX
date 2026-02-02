import {app,server} from './src/app.js';
import dotenv from 'dotenv';
import seedSkills from './src/seed/seedSkills.js';
import seedProblems from './src/seed/seedProblems.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

seedSkills();
seedProblems()