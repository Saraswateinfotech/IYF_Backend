const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const JWT_SECRET = process.env.JWT_SECRET;

// // Utility function to generate a random 6-digit number
// const generateRandomDigits = (length = 6) => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Utility function to generate a unique userId
// const generateUserId = async (name) => {
//   const namePart = name.substring(0, 3).toUpperCase().padEnd(3, "X");
//   let userId;
//   let isUnique = false;

//   while (!isUnique) {
//     const randomDigits = generateRandomDigits();
//     userId = `${namePart}${randomDigits}`;
//     isUnique = await isUserIdUnique(userId);
//   }

//   return userId;
// };

// // Function to check if userId already exists
// const isUserIdUnique = (userId) => {
//   return new Promise((resolve, reject) => {
//     const checkSql =
//       "SELECT COUNT(*) as count FROM iyfdashboardAccounts WHERE user_id = ?";
//     db.query(checkSql, [userId], (err, results) => {
//       if (err) return reject(err);
//       resolve(results[0].count === 0);
//     });
//   });
// };

// exports.signUp = async (req, res) => {
//   const { name, phone_number, email, password, role } = req.body;

//   if (!name || !phone_number || !email || !password || !role) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const userId = await generateUserId(name);

//     // Check for existing user (Duplicate Entry)
//     const checkDuplicateQuery = `SELECT * FROM iyfdashboardAccounts WHERE email = ? OR phone_number = ? OR user_id = ?`;
//     db.query(
//       checkDuplicateQuery,
//       [email, phone_number, userId],
//       (err, results) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ error: "Database error", details: err.sqlMessage });
//         }

//         if (results.length > 0) {
//           return res.status(400).json({ error: "User already exists!" });
//         }

//         //  Insert User Data
//         const sql = `
//               INSERT INTO iyfdashboardAccounts (user_id, name, email, phone_number, password, textpassword, role)
//               VALUES (?, ?, ?, ?, ?, ?, ?)
//           `;

//         db.query(
//           sql,
//           [userId, name, email, phone_number, hashedPassword, password, role],
//           (err, result) => {
//             if (err) {
//               return res
//                 .status(500)
//                 .json({ error: "Database error", details: err.sqlMessage });
//             }

//             //  Ensure response is sent
//             return res.status(201).json({
//               message: "User registered successfully",
//               userId: userId,
//             });
//           }
//         );
//       }
//     );
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };


// const generateRandomDigits = (length = 6) => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const generateUserId = async (name) => {
//   const namePart = name.substring(0, 3).toUpperCase().padEnd(3, "X");
//   let userId;
//   let isUnique = false;

//   while (!isUnique) {
//     const randomDigits = generateRandomDigits();
//     userId = `${namePart}${randomDigits}`;
//     isUnique = await isUserIdUnique(userId);
//   }

//   return userId;
// };

// const isUserIdUnique = (userId) => {
//   return new Promise((resolve, reject) => {
//     const checkSql = "SELECT COUNT(*) as count FROM iyfdashboardAccounts WHERE user_id = ?";
//     db.query(checkSql, [userId], (err, results) => {
//       if (err) return reject(err);
//       resolve(results[0].count === 0);
//     });
//   });
// };

// exports.signUp = async (req, res) => {
//   const { name, phone_number, email, password, role } = req.body;

//   if (!name || !phone_number || !email || !password || !role) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // const userId = await generateUserId(name);
//     const userId = phone_number;

//     const checkDuplicateQuery = `
//       SELECT * FROM iyfdashboardAccounts 
//       WHERE email = ? OR phone_number = ? OR user_id = ?
//     `;
//     db.query(checkDuplicateQuery, [email, phone_number, userId], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//       }

//       if (results.length > 0) {
//         return res.status(400).json({ error: "User already exists!" });
//       }

//       const insertQuery = `
//         INSERT INTO iyfdashboardAccounts (user_id, name, email, phone_number, password, textpassword, role)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//       `;

//       db.query(
//         insertQuery,
//         [userId, name, email, phone_number, hashedPassword, password, role],
//         (err, result) => {
//           if (err) {
//             return res.status(500).json({ error: "Database error", details: err.sqlMessage });
//           }

//           // Send thank-you email
//           const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//               user: process.env.EMAIL,
//               pass: process.env.EMAIL_PASSWORD,
//             },
//           });

//           const mailOptions = {
//             from: '"IYF Dashboard"',
//             to: email,
//             subject: "Welcome to IYF Dashboard",
//             text: `Dear ${name},\n\nThank you for registering on the IYF Dashboard.\n\nYour ID: ${userId}\n\nYour Password: ${password}\n\nRegards,\nTeam IYF`,
//           };

//           transporter.sendMail(mailOptions, (emailErr, info) => {
//             if (emailErr) console.error("Email send error:", emailErr);
//             else console.log("Email sent:", info.response);
//           });

//           return res.status(201).json({
//             message: "User registered successfully",
//             userId,
//           });
//         }
//       );
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };

exports.signUp = async (req, res) => {
  const { name, phone_number, email, password, role } = req.body;

  if (!name || !phone_number || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = phone_number;

    const checkDuplicateQuery = `
      SELECT * FROM iyfdashboardAccounts 
      WHERE email = ? OR phone_number = ? OR user_id = ?
    `;
    db.query(checkDuplicateQuery, [email, phone_number, userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err.sqlMessage });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "User already exists!" });
      }

      const insertQuery = `
        INSERT INTO iyfdashboardAccounts (user_id, name, email, phone_number, password, textpassword, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [userId, name, email, phone_number, hashedPassword, password, role],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Database error", details: err.sqlMessage });
          }

          // Send welcome email with complete text
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: '"IYF Jaipur" <iyfjaipur@example.com>',
            to: email,
            subject: "Hare Krishna! Welcome to IYF Jaipur's Preaching Platform",
            text: `Hare Krishna!

Dear ${name} Prabhu,

Congratulations! You have successfully joined the IYF Jaipur's Preaching Platform, an opportunity to serve and please Guru and Gauranga.

We highly recommend you read the following bhajan by Srila Prabhupada to align yourself with his mood and mission:

Bhajan Name: Krsna Tava Punya Habe Bhai 
Author: His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada

LYRICS:

Refrain:
kṛṣṇa taba puṇya habe bhāi
e-puṇya koribe jabe rādhārāṇī sukhī habe
dhruva ati boli tomā tāi

*(1)*
śrī-siddhānta saraswatī śacī-suta priya ati
kṛṣṇa-sebāya jāra tula nāi
sei se mohānta-guru jagater madhye uru
kṛṣṇa-bhakti deya ṭhāi ṭhāi

*(2)*
tāra icchā balavān pāścātyete ṭhān ṭhān
hoy jāte gaurāńger nām
pṛthivīte nagarādi āsamudra nada nadī
sakalei bole kṛṣṇa rāma

*(3)*
tāhale ānanda hoy tabe hoy digvijay
caitanyer kṛpā atiśay
māyā duṣṭa jata duḥkhī jagate sabāi sukhī
vaiṣṇaver icchā pūrṇa hoy

*(4)*
se kārja je koribāre ājñā jadi dilo more
jogya nahi ati dīna hīna
tāi se tomāra kṛpā māgitechi anurūpā
āji tumi sabār pravīṇa

*(5)*
tomāra se śakti pele guru-sebāya bastu mile
jībana sārthak jadi hoy
sei se sevā paile tāhale sukhī hale
taba sańga bhāgyate miloy

*(6)*
evaḿ janaḿ nipatitaḿ prabhavāhikūpe
kāmābhikāmam anu yaḥ prapatan prasańgāt
kṛtvātmasāt surarṣiṇā bhagavan gṛhītaḥ
so 'haḿ kathaḿ nu visṛje tava bhṛtya-sevām

*(7)*
tumi mor cira sāthī bhuliyā māyār lāthi
khāiyāchi janma-janmāntare
āji punaḥ e sujoga jadi hoy jogāyoga
tabe pāri tuńhe milibāre

*(8)*
tomāra milane bhāi ābār se sukha pāi
gocārane ghuri din bhor
kata bane chuṭāchuṭi bane khāi luṭāluṭi
sei din kabe habe mor

*(9)*
āji se suvidhā hala tomāra smaraṇa bhela
boro āśā ḍākilām tāi
āmi tomāra nitya-dāsa tāi kori eto āśa
tumi binā anya gati nāi

---

TRANSLATION:

*Refrain:*
O brothers, (O brother) The Supreme Lord Krishna will bestow virtue upon you — but He will do this only when Srimati Radharani first becomes pleased with you. This I surely declare to you.

*(1)*
Sri Srimad Bhaktisiddhanta Sarasvati Thakura, who is very dear to Lord Gauranga, the son of Mother Saci, is unparalleled in his service to the Supreme Lord Sri Krishna. He is that great saintly spiritual master, most magnanimous within this universe, who bestows devotion to Krishna in various places throughout the world.

*(2)*
His desire is very powerful, and thus he is causing the Holy Name of Lord Gauranga to spread throughout all the countries of the Western World. In all the cities, towns, and villages on the earth, extending to all the oceans, rivers, and streams, everyone may chant the names of Krishna and Rama.

*(3)*
Thus, all directions will be conquered by a flood of transcendental ecstasy flowing with the excessive mercy of Sri Caitanya Mahaprabhu. When all the miserable living entities that have been corrupted by maya become happy, then the Vaisnava's desire is fulfilled.

*(4)*
Although my Guru Maharaja ordered me to accomplish this mission, I am unworthy to do it, being very fallen and incompetent. That being the case, O Lord Krishna, Your mercy is today arising in a befitting manner to make me become worthy, for You are the wisest of all.

*(5)*
If You bestow Your divine power, then one attains the factual substance which is service to the spiritual master - and life becomes successful. If that service is obtained, then one becomes truly satisfied, and ultimately receives Your association due to good fortune.

*(6)*
(As stated by Prahlada Maharaja to Lord Nrsimhadeva in the Srimad Bhagavatam, 7.9.28:)
"Thus, by associating with material desires one after another, I was following the general populace by falling into a blind well full of snakes. My dear Lord, O Supreme Personality of Godhead! Then the great sage Narada Muni kindly accepted me as his disciple, and instructed me how to achieve the transcendental position similar to his own. How could I ever leave the service of your servant?"

*(7)*
O Lord Krishna, You are my eternal companion. Forgetting You, I have suffered the kicking of maya birth after birth. If today the chance to meet You occurs again, then surely I will be able to rejoin You.

*(8)*
O my dear brother! In Your company I will experience great joy once again. Wandering about the pastures and fields, I will pass the entire day with You in tending the cows. Joking with You and frolicking throughout so many forests of Vraja, I will enjoy pastimes of stealing and eating one another's lunch. When, oh when will that day be mine?

*(9)*
Today that remembrance of being with You came to me in a very nice way. Feeling great longing I called out for You, O Lord Krishna! Only because I am Your eternal servant do I desire Your association so much. Except for You, I have no other refuge.

-------------------------------------------

Your ID: ${userId}
Your Password: ${password}

May Sri Sri Giridhari Dauji, Sri Sri Radha Madan Mohan, and Sri Sri Gaur Nitai bless you to serve in the preaching mission of Srila Prabhupada and make progress on your spiritual journey.

Warm Regards,
Team IYF Jaipur
ISKCON Jaipur`
          };

          transporter.sendMail(mailOptions, (emailErr, info) => {
            if (emailErr) console.error("Email send error:", emailErr);
            else console.log("Email sent:", info.response);
          });

          return res.status(201).json({
            message: "User registered successfully",
            userId,
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { user_id, password } = req.body;

  // Check if all fields are provided
  if (!user_id || !password) {
    return res.status(400).json({ error: "User ID and Password are required" });
  }

  try {
    const sql = `SELECT * FROM iyfdashboardAccounts WHERE user_id = ?`;
    db.query(sql, [user_id], async (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", details: err.sqlMessage });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid User ID or Password" });
      }

      const user = results[0]; // First user entry

      //  Compare Passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid User ID or Password" });
      }

      //  Generate JWT Token
      const token = jwt.sign(
        { userId: user.user_id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "99h" } // Token Validity
      );

      // Send Response
      return res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          userId: user.user_id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
        },
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getDashboard = (req, res) => {
  const sql =
    "SELECT user_id, name, email, phone_number, role,textpassword, created_at FROM iyfdashboardAccounts";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.json(results);
  });
};

exports.deleteDashboard = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const sql = "DELETE FROM iyfdashboardAccounts WHERE user_id = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  });
};
