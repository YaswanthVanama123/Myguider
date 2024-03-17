const express = require("express");
const session = require('express-session');
const ejs = require('ejs');

const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
app.set('view engine', 'ejs');



const dbPath = path.join(__dirname, "myguider.db");

const connectDb = async () => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        return db;
    } catch (error) {
        console.error("Database error:", error.message);
        throw error;
    }
};


// generateSecretKey.js
const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();
console.log("Generated Secret Key:", secretKey);
app.use(session({
    secret: secretKey, // Use your actual secret key here
    resave: false,
    saveUninitialized: true
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Serve myguider.html for both "/" and "/business/signup" routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "myguider.html"));
});

app.get("/business/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "businessSignup.html"));
});

app.get("/business/signin",(req,res) => {
    res.sendFile(path.join(__dirname, "public", "businessLogin.html"));
});

app.get("/user/signup",(req,res) =>{
    res.sendFile(path.join(__dirname, "public", "userSignup.html"));
});

app.get("/user/signin",(req,res) =>{
    res.sendFile(path.join(__dirname, "public", "userSignin.html"));
});



app.get("/business/skilledworkers/registration",(req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "skilledWorkersRegistration.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/property/registration", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "propertyRegistration.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/parttime/registration", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "parttimeRegistration.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/businesslocation/registration", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "businesslocation.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/skilledworkers/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "skilledWorkersHomePage.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/property/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "propertyHomePage.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/businesslocation/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "businesslocationHomePage.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/parttime/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "parttimeHomePage.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/business/sidebar", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "businessSidebar.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/user/skilledworkers/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "userSkilledWorkersHomePage.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/user/property/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "userProperty.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/user/parttime/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "userParttime.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
})

app.get("/user/businesslocation/homepage", (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
        // Redirect the user to the businessService.html page with the userEmail as a query parameter
        res.sendFile(path.join(__dirname, "public", "userBusinessLocation.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
    
})






// Check if email exists in skilled workers table
app.get("/skilledworkers/checkEmail", async (req, res) => {
    const { email } = req.query;
    try {
        const db = await connectDb();
        const skilledWorker = await db.get(
            "SELECT * FROM skilledworkers WHERE email = ?",
            [email]
        );
        if (skilledWorker) {
            // Email exists in skilled workers table
            res.json({ exists: true });
        } else {
            // Email does not exist in skilled workers table
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Backend route to check if the user email exists in the parttime table
app.get("/parttime/checkEmail", async (req, res) => {
    const { userEmail } = req.query;
    try {
        const db = await connectDb();
        const partTimeWorker = await db.get(
            "SELECT * FROM parttime WHERE email = ?",
            [userEmail]
        );
        if (partTimeWorker) {
            res.status(200).json({ message: "Email exists" });
        } else {
            res.status(404).json({ error: "Email not found" });
        }
    } catch (error) {
        console.error("Error checking email:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Backend route to check if the user email exists in the property table
app.get("/business/property/checkEmail", async (req, res) => {
    const { userEmail } = req.query;
    try {
        const db = await connectDb();
        const property = await db.get(
            "SELECT * FROM property WHERE email = ?",
            [userEmail]
        );
        if (property) {
            res.status(200).send("Email exists");
        } else {
            res.status(404).send("Email not found");
        }
    } catch (error) {
        console.error("Error checking email:", error.message);
        res.status(500).send("Internal server error");
    }
});
// Backend route to check if the user email exists in the businesslocation table
app.get("/businesslocation/checkEmail", async (req, res) => {
    const { userEmail } = req.query;
    try {
        const db = await connectDb(); // Connect to the SQLite database
        const location = await db.get(
            "SELECT * FROM businesslocation WHERE email = ?",
            [userEmail]
        );
        if (location) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Backend Route to Fetch Skilled Worker Details
app.get("/skilledworkers/details", async (req, res) => {
    const userEmail = req.session.email;
    if (userEmail) {
        try {
            const db = await connectDb();
            const skilledWorker = await db.get(
                "SELECT * FROM skilledworkers WHERE email = ?",
                [userEmail]
            );
            if (skilledWorker) {
                res.status(200).json(skilledWorker);
            } else {
                res.status(404).json({ error: "Skilled worker details not found" });
            }
        } catch (error) {
            console.error("Error fetching skilled worker details:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});

// Backend Route to Update Skilled Worker Status
app.post("/skilledworkers/status", async (req, res) => {
    const userEmail = req.session.email;
    const { status } = req.body;
    if (userEmail) {
        try {
            const db = await connectDb();
            await db.run(
                "UPDATE skilledworkers SET skilledworkersstatus = ? WHERE email = ?",
                [status, userEmail]
            );
            res.status(200).json({ message: "Skilled worker status updated successfully" });
        } catch (error) {
            console.error("Error updating skilled worker status:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});


// Backend Route to Fetch Property Details
app.get("/property/details", async (req, res) => {
    const userEmail = req.session.email;
    if (userEmail) {
        try {
            const db = await connectDb();
            const property = await db.get(
                "SELECT * FROM property WHERE email = ?",
                [userEmail]
            );
            if (property) {
                res.status(200).json(property);
            } else {
                res.status(404).json({ error: "Property details not found" });
            }
        } catch (error) {
            console.error("Error fetching property details:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});

// Backend Route to Update Property Status
app.post("/property/status", async (req, res) => {
    const userEmail = req.session.email;
    const { status } = req.body;
    if (userEmail) {
        try {
            const db = await connectDb();
            await db.run(
                "UPDATE property SET property_registration_status = ? WHERE email = ?",
                [status, userEmail]
            );
            res.status(200).json({ message: "Property status updated successfully" });
        } catch (error) {
            console.error("Error updating property status:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});


// Backend Route to Fetch Part Time Business Details
app.get("/parttime/details", async (req, res) => {
    const userEmail = req.session.email;
    if (userEmail) {
        try {
            const db = await connectDb();
            const partTimeBusiness = await db.get(
                "SELECT * FROM parttime WHERE email = ?",
                [userEmail]
            );
            if (partTimeBusiness) {
                res.status(200).json(partTimeBusiness);
            } else {
                res.status(404).json({ error: "Part Time business details not found" });
            }
        } catch (error) {
            console.error("Error fetching Part Time business details:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});

// Backend Route to Update Part Time Business Status
app.post("/parttime/status", async (req, res) => {
    const userEmail = req.session.email;
    const { status } = req.body;
    if (userEmail) {
        try {
            const db = await connectDb();
            await db.run(
                "UPDATE parttime SET parttime_status = ? WHERE email = ?",
                [status, userEmail]
            );
            res.status(200).json({ message: "Part Time business status updated successfully" });
        } catch (error) {
            console.error("Error updating Part Time business status:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});

// Backend Route to Fetch Business Location Details
app.get("/businesslocation/details", async (req, res) => {
    const userEmail = req.session.email;
    if (userEmail) {
        try {
            const db = await connectDb();
            const businessLocation = await db.get(
                "SELECT * FROM businesslocation WHERE email = ?",
                [userEmail]
            );
            if (businessLocation) {
                res.status(200).json(businessLocation);
            } else {
                res.status(404).json({ error: "Business location details not found" });
            }
        } catch (error) {
            console.error("Error fetching business location details:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});

// Backend Route to Update Business Location Status
app.post("/businesslocation/status", async (req, res) => {
    const userEmail = req.session.email;
    const { status } = req.body;
    if (userEmail) {
        try {
            const db = await connectDb();
            await db.run(
                "UPDATE businesslocation SET business_location_status = ? WHERE email = ?",
                [status, userEmail]
            );
            res.status(200).json({ message: "Business location status updated successfully" });
        } catch (error) {
            console.error("Error updating business location status:", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(401).json({ error: "Unauthorized access" });
    }
});


app.get('/business/skilledworkers/editdetails',(req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "skilledWorkersEditDetails.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }   
})

app.post('/business/skilledworkers/editregistration', async (req, res) => {
    const { email, name, age, gender, phonenumber, state, city, area, pincode, occupation } = req.body;
    try {
        const db = await connectDb();

        // Check if the email already exists in the skilledworkers table
        const existingWorker = await db.get(
            "SELECT * FROM skilledworkers WHERE email = ?",
            [email]
        );
        if (!existingWorker) {
            return res.status(400).json({ error: "Skilled worker does not exist" });
        }

        // Update more than five columns
        await db.run(`UPDATE skilledworkers
            SET email = ?, 
                name = ?, 
                age = ?, 
                gender = ?, 
                phonenumber = ?,
                state = ?,
                city = ?, 
                area = ?,
                pincode = ?,
                occupation = ?
            WHERE email = ?`, [email, name, age, gender, phonenumber, state, city, area, pincode, occupation, email], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Rows updated: ${this.changes}`);
        });

        return res.status(200).json({ message: 'Skilled worker details updated successfully' });
    } catch (error) {
        console.error('Error updating skilled worker details:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/business/parttime/editdetails', (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "parttimeEditDetails.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }     
})

// POST request to update part-time details
app.post('/parttime/editregisteration', async (req, res) => {
    const {
        email,
        shop_name,
        work_type,
        phonenumber,
        no_of_vacancies,
        city,
        area,
        pincode,
        education,
        expected_salary,
        job_for
    } = req.body;

    try {
        const db = await connectDb();

        // Update part-time details in the database
        const sql = `
            UPDATE parttime 
            SET shop_name = ?,
                work_type = ?,
                phonenumber = ?,
                no_of_vacancies = ?,
                city = ?,
                area = ?,
                pincode = ?,
                education = ?,
                expected_salary = ?,
                job_for = ?
            WHERE email = ?`;
        
        await db.run(sql, [
            shop_name,
            work_type,
            phonenumber,
            no_of_vacancies,
            city,
            area,
            pincode,
            education,
            expected_salary,
            job_for,
            email
        ]);

        console.log("Part-time details updated successfully");
        res.status(200).json({ message: 'Part-time details updated successfully' });
    } catch (error) {
        console.error('Error updating part-time details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/business/businesslocation/editdetails',(req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "businessLocationEditDetails.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }  
})

// POST request to update business location details
app.post('/business/businesslocation/editregistration', async (req, res) => {
    const {
        email,
        shopname,
        opensinaweek,
        openat,
        closesat,
        phoneno,
        city,
        areaLocation,
        state,
        type,
        pincodeLocation,
        special
    } = req.body;

    try {
        const db = await connectDb();

        // Update location details in the database
        const sql = `
            UPDATE businesslocation 
            SET shop_name = ?,
                opens_in_a_week = ?,
                opens_at = ?,
                closes_at = ?,
                phonenumber = ?,
                city = ?,
                area = ?,
                state = ?,
                shop_type = ?,
                pincode = ?,
                special = ?
            WHERE email = ?`;
        
        await db.run(sql, [
            shopname,
            opensinaweek,
            openat,
            closesat,
            phoneno,
            city,
            areaLocation,
            state,
            type,
            pincodeLocation,
            special,
            email
        ]);

        console.log("Location details updated successfully");
        res.status(200).json({ message: 'Location details updated successfully' });
    } catch (error) {
        console.error('Error updating location details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/business/property/editdetails', (req,res) =>{
    const userEmail = req.session.email;
    if (userEmail) {
    res.sendFile(path.join(__dirname, "public", "propertyEditDetails.html"));
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }  
})

app.post('/business/property/editregistration', async (req, res) => {
    try {
        const {
            email,
            name,
            age,
            members_can_stay,
            phonenumber,
            state,
            city,
            area,
            pincode,
            property_type,
            stay_type,
            estimated_cost
        } = req.body;

        // Ensure that all required fields are provided
        if (!email || !name || !age || !phonenumber || !state || !city || !area || !pincode || !property_type || !stay_type || !estimated_cost) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = await connectDb();

        // Update property details in the database
        const sql = `
            UPDATE property
            SET 
                name = ?,
                age = ?,
                members_can_stay = ?,
                phonenumber = ?,
                state = ?,
                city = ?,
                area = ?,
                pincode = ?,
                property_type = ?,
                stay_type = ?,
                estimated_cost = ?
            WHERE email = ?`;

        await db.run(sql, [
            name,
            age,
            members_can_stay,
            phonenumber,
            state,
            city,
            area,
            pincode,
            property_type,
            stay_type,
            estimated_cost,
            email
        ]);

        console.log("Property details updated successfully");
        res.status(200).json({ message: 'Property details updated successfully' });
    } catch (error) {
        console.error('Error updating property details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});








// Signup route
app.post("/user/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectDb();
        const existingUser = await db.get(
            "SELECT * FROM userlogin WHERE email_id = ?",
            [email]
        );
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        await db.run(
            "INSERT INTO userlogin (email_id, password) VALUES (?, ?)",
            [email, password]
        );
        req.session.email = email;
        return res.status(200).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// POST /user/login route handler
app.post("/user/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = await connectDb();
        const user = await db.get(
            "SELECT * FROM userlogin WHERE email_id = ?",
            [username]
        );
        if (user) {
            if (user.password === password) {
                req.session.email = username;
                res.status(200).send("Login successful!");
            } else {
                res.status(401).send("Incorrect password.");
            }
        } else {
            res.status(404).send("Username not found.");
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).send("Error logging in. Please try again later.");
    }
});





app.post("/business/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectDb();
        const existingBusiness = await db.get(
            "SELECT * FROM businesslogin WHERE email_id = ?",
            [email]
        );
        if (existingBusiness) {
            return res.status(400).json({ error: "Email already exists" });
        }
        await db.run(
            "INSERT INTO businesslogin (email_id, password) VALUES (?, ?)",
            [email, password]
        );
        req.session.email = email;
        return res.status(200).json({ message: "Business signed up successfully" });
    } catch (error) {
        console.error("Business signup error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// Business login route
app.post("/business/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectDb();
        const business = await db.get(
            "SELECT * FROM businesslogin WHERE email_id = ?",
            [email]
        );
        if (business) {
            if (business.password === password) {
                // Set session email

                req.session.email = email;
                res.status(200).send("Login successful!");
            } else {
                res.status(401).send("Incorrect password.");
            }
        } else {
            res.status(404).send("Username not found.");
        }
    } catch (error) {
        console.error("Error logging in business:", error.message);
        res.status(500).send("Error logging in. Please try again later.");
    }
});

// POST /business/skilledworkers/registration route handler
app.post('/business/skilledworkers/registration', async (req, res) => {
    const { email, name, age, gender, phonenumber, state, city, area, pincode, occupation } = req.body;
    try {
        const db = await connectDb();

        // Check if the email already exists in the skilled_workers table
        const existingWorker = await db.get(
            "SELECT * FROM skilledworkers WHERE email = ?",
            [email]
        );
        if (existingWorker) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Insert the new skilled worker into the skilled_workers table
        await db.run(
            'INSERT INTO skilledworkers (email, name, age, gender, phonenumber, state, city, area, pincode, occupation, rating, totalusers, averagerating, skilledworkersstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [email, name, age, gender, phonenumber, state, city, area, pincode, occupation, 5, 1, 5, true]
        );

        return res.status(200).json({ message: 'Skilled worker registered successfully' });
    } catch (error) {
        console.error('Error registering skilled worker:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




// POST request to register part-time details
app.post('/parttime/register', async (req, res) => {
    const {
        email,
        shop_name,
        work_type,
        phonenumber,
        no_of_vacancies,
        city,
        area,
        pincode,
        education,
        expected_salary,
        job_for,
        profileurl,
        proofurl,
        parttime_image_url
    } = req.body;

    try {
        const db = await connectDb();

        // Insert part-time details into the database
        const sql = `
            INSERT INTO parttime (
                email,
                shop_name,
                work_type,
                phonenumber,
                no_of_vacancies,
                city,
                area,
                pincode,
                education,
                expected_salary,
                job_for,
                profileurl,
                proofurl,
                parttime_image_url,
                rating,
                totalusers,
                averagerating,
                parttime_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await db.run(sql, [
            email,
            shop_name,
            work_type,
            phonenumber,
            no_of_vacancies,
            city,
            area,
            pincode,
            education,
            expected_salary,
            job_for,
            profileurl,
            proofurl,
            parttime_image_url,
            5.0,
            1,
            5.0,
            true
        ]);

        console.log("Part-time registration successful");
        res.status(200).json({ message: 'Part-time registration successful' });
    } catch (error) {
        console.error('Error registering part-time details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// POST request to register property details
app.post('/business/property/register', async (req, res) => {
    try {
        const {
            email,
            name,
            age,
            members_can_stay,
            phonenumber,
            state,
            city,
            area,
            pincode,
            property_type,
            stay_type,
            estimated_cost
        } = req.body;

        // Ensure that all required fields are provided
        if (!email || !name || !age || !phonenumber || !state || !city || !area || !pincode || !property_type || !stay_type || !estimated_cost) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = await connectDb();

        // Insert property details into the database
        const sql = `
            INSERT INTO property (
                email,
                name,
                age,
                members_can_stay,
                phonenumber,
                state,
                city,
                area,
                pincode,
                property_type,
                stay_type,
                estimated_cost
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.run(sql, [
            email,
            name,
            age,
            members_can_stay,
            phonenumber,
            state,
            city,
            area,
            pincode,
            property_type,
            stay_type,
            estimated_cost
        ]);

        console.log("Property registration successful");
        res.status(200).json({ message: 'Property registration successful' });
    } catch (error) {
        console.error('Error registering property details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// POST request to register location details
app.post('/business/location/register', async (req, res) => {
    const {
        email,
        shopname,
        opensinaweek,
        openat,
        closesat,
        phoneno,
        city,
        areaLocation,
        state,
        type,
        pincodeLocation,
        special,
        profileurl,
        proofurl,
        business_image_url
    } = req.body;

    try {
        const db = await connectDb();

        // Insert location details into the database
        const sql = `
            INSERT INTO businesslocation (
                email,
                shop_name,
                opens_in_a_week,
                opens_at,
                closes_at,
                phonenumber,
                city,
                area,
                state,
                shop_type,
                pincode,
                special,
                rating,
                totalusers,
                averagerating,
                business_location_status,
                profileurl,
                proofurl,
                business_image_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await db.run(sql, [
            email,
            shopname,
            opensinaweek,
            openat,
            closesat,
            phoneno,
            city,
            areaLocation,
            state,
            type,
            pincodeLocation,
            special,
            5.0, // Default rating
            1,    // Default totalusers
            5.0,  // Default averagerating
            true, // Default business_location_status
            profileurl,
            proofurl,
            business_image_url
        ]);

        console.log("Location registration successful");
        res.status(200).json({ message: 'Location registration successful' });
    } catch (error) {
        console.error('Error registering location details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route to serve businessService.html and send user's email
app.get("/business/service", (req, res) => {
    // Retrieve the email from the session
    const userEmail = req.session.email;
    if (userEmail) {
        // Redirect the user to the businessService.html page with the userEmail as a query parameter
        res.redirect(`/businessService.html?userEmail=${userEmail}`);
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
});


// Route to serve userSevicePage.html and send user's email
app.get("/user/service", (req, res) => {
    // Retrieve the email from the session
    const userEmail = req.session.email;
    if (userEmail) {
        // Redirect the user to the businessService.html page with the userEmail as a query parameter
        res.redirect(`/userSevicePage.html?userEmail=${userEmail}`);
    } else {
        // Handle the case when the email is not found in the session
        res.sendFile(path.join(__dirname, "public", "404error.html"));
    }
});


// Endpoint to retrieve all details from skilledworkers table
app.get('/skilledworkers', async (req, res) => {
    try {
        const db = await connectDb(); // Connect to the SQLite database

        // Query the skilledworkers table to fetch all user details
        const skilledWorkers = await db.all('SELECT * FROM skilledworkers');

        res.json(skilledWorkers); // Send skilledWorkers data as JSON response
    } catch (error) {
        console.error('Error fetching skilled worker details:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define route handler to update worker rating
app.post('/skilledworkers/updateRating', async (req, res) => {
    try {

        // Extract updated rating details from request body
        const { averageRating, totalRating, totalUsers, workerEmail } = req.body;

        // Update the skilled worker's rating in the database
        const db = await connectDb();
        const updateQuery = `
            UPDATE skilledworkers
            SET averagerating = $averageRating,
                rating = $totalRating,
                totalusers = $totalUsers
            WHERE email = $workerEmail
        `;
        db.run(updateQuery, {
            $averageRating: averageRating,
            $totalRating: totalRating,
            $totalUsers: totalUsers,
            $workerEmail: workerEmail
        }, (error) => {
            if (error) {
                throw error;
            }
            console.log(`Rating updated for worker with email ${workerEmail}`);
            res.json({ success: true, message: `Rating updated for worker with email ${workerEmail}` });
        });

        // Close the database connection
        db.close();
    } catch (error) {
        console.error('Error updating worker rating:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Endpoint to retrieve reviews for a specific business_email from the review table
app.get('/reviews', async (req, res) => {
    const { business_email } = req.query;

    try {
        const db = await connectDb(); // Connect to the SQLite database

        // Query the review table to fetch reviews for the specified business_email
        const reviews = await db.all('SELECT * FROM review WHERE business_email = ?', [business_email]);

        // If there are no reviews found, return an empty array
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for the specified business email' });
        }

        // Return the reviews as JSON response
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// POST endpoint to add a review
app.post('/review', async (req, res) => {
    const { business_email, review_time, content, likecount, unlikecount } = req.body;
    const user_email = req.session.email;
    const db = await connectDb();

    try {
        // Insert review into the database
        const insertQuery = `INSERT INTO review (business_email, user_email, review_time, content, likecount, unlikecount) VALUES (?, ?, ?, ?, ?, ?)`;
        await db.run(insertQuery, [business_email, user_email, review_time, content, likecount, unlikecount]);
        console.log('Review inserted successfully');
        return res.status(201).json({ message: 'Review inserted successfully' });
    } catch (error) {
        console.error('Error inserting review:', error);
        return res.status(500).json({ error: 'Error inserting review' });
    }
});

// PUT endpoint to update likecount and unlikecount of a review
app.put('/update_review/:uniqueId', async (req, res) => {
    const { likecount, unlikecount } = req.body;
    const uniqueId = req.params.uniqueId;
    const db = await connectDb();

    try {
        // Update review in the database
        const updateQuery = `UPDATE review SET likecount = ?, unlikecount = ? WHERE rid = ?`;
        await db.run(updateQuery, [likecount, unlikecount, uniqueId]);
        console.log('Review updated successfully');
        return res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        return res.status(500).json({ error: 'Error updating review' });
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




