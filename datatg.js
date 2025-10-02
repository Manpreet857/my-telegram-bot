// // npm install node-telegram-bot-api

// const TelegramBot = require("node-telegram-bot-api");

// // put your token here (or use env variable)
// const token = process.env.TG_BOT_TOKEN || "8199383847:AAEWlPCqJoNcyzWUDQnlTNsEK9eyK5Vw3CU";
// const bot = new TelegramBot(token, { polling: true });

// // store unique users in a Set
// const uniqueUsers = new Set();

// function getSender(msg) {
//   if (msg.from) {
//     if (msg.from.username) return `@${msg.from.username}`;
//     let name = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(" ");
//     return name ? `${name} (id:${msg.from.id})` : `id:${msg.from.id}`;
//   }
//   if (msg.sender_chat) {
//     return `sender_chat: ${msg.sender_chat.title || msg.sender_chat.id}`;
//   }
//   return "unknown";
// }

// // Listen to every message in group
// bot.on("message", (msg) => {
//   const sender = getSender(msg);

//   if (!uniqueUsers.has(sender)) {
//     uniqueUsers.add(sender);

//     // Print in console
//     console.log("New user detected:", sender);

//     // Send to group (optional)
//     // bot.sendMessage(msg.chat.id, `👤 New participant: ${sender}`);
//   }

//   // Debug: show live unique list
// //   console.log("All unique users so far:", Array.from(uniqueUsers));
// });
// yess ssssssssssssssssssssssssssssssssssssss
// const TelegramBot = require("node-telegram-bot-api");

// const token = process.env.TG_BOT_TOKEN || "8199383847:AAEWlPCqJoNcyzWUDQnlTNsEK9eyK5Vw3CU";
// const bot = new TelegramBot(token, { polling: true });

// // Target chat ID (user or group)
// const targetChatId = "-4803308889";

// // Store unique users in memory
// const uniqueUsers = new Set();

// function getSender(msg) {
//   if (msg.from) {
//     if (msg.from.username) return `@${msg.from.username}`;
//     let name = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(" ");
//     return name ? `${name} (id:${msg.from.id})` : `id:${msg.from.id}`;
//   }
//   if (msg.sender_chat) {
//     return `sender_chat: ${msg.sender_chat.title || msg.sender_chat.id}`;
//   }
//   return "unknown";
// }

// bot.on("message", (msg) => {
//   const sender = getSender(msg);
//   console.log(`Chat ID: ${msg.chat.id} | Sender: ${sender}`);

//   if (!uniqueUsers.has(sender)) {
//     uniqueUsers.add(sender);

//     // Send to target chat
//     bot.sendMessage(targetChatId, `👤 New user detected: ${sender}`);
//   }
// });
// yessssssssssssssssssssssssssssssssssss



// const TelegramBot = require("node-telegram-bot-api");
// const sqlite3 = require("sqlite3").verbose();

// const token = process.env.TG_BOT_TOKEN || "8199383847:AAEWlPCqJoNcyzWUDQnlTNsEK9eyK5Vw3CU";
// const bot = new TelegramBot(token, { polling: true });

// const targetChatId = "-4803308889";

// // Setup SQLite
// const db = new sqlite3.Database("./users.db");
// db.run(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT,
//     user_id INTEGER,
//     group_id INTEGER,
//     group_name TEXT,
//     UNIQUE(user_id, group_id)
//   )
// `);

// function getSender(msg) {
//   if (msg.from) {
//     if (msg.from.username) return `@${msg.from.username}`;
//     return [msg.from.first_name, msg.from.last_name].filter(Boolean).join(" ") + ` (id:${msg.from.id})`;
//   }
//   if (msg.sender_chat) return msg.sender_chat.title || msg.sender_chat.id;
//   return "unknown";
// }

// bot.on("message", (msg) => {
//   const sender = getSender(msg);
//   const userId = msg.from?.id;
//   const groupId = msg.chat.id;
//   const groupName = msg.chat.title || msg.chat.id;

//   // Console log for debugging
//   console.log(`📥 New message from group "${groupName}" (${groupId}) by ${sender}`);

//   // Insert into SQLite (ignore duplicates)
//   db.run(
//     `INSERT OR IGNORE INTO users (username, user_id, group_id, group_name) VALUES (?, ?, ?, ?)`,
//     [sender, userId, groupId, groupName],
//     (err) => {
//       if (err) return console.error("❌ DB Error:", err.message);

//       // Notify target chat only if it's a new user
//       bot.sendMessage(targetChatId, `👤 New user detected in "${groupName}": ${sender}`);
//     }
//   );
// });

// yessssssssssssssssssssssssssssssssssssssss
// const TelegramBot = require("node-telegram-bot-api");
// const { MongoClient } = require("mongodb");

// // ================== CONFIG ==================
// const token = process.env.TG_BOT_TOKEN || "8199383847:AAEWlPCqJoNcyzWUDQnlTNsEK9eyK5Vw3CU" ; // 🔑 put bot token here
// const mongoUri = process.env.MONGO_URI || "mongodb+srv://heroo9466_db_user:WpBmy6oxB3RpD7uK@cluster0.rd6y0x6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // 🔑 put MongoDB URI here
// const targetChatId = "-4803308889"; // chat where usernames will be sent

// // Create bot instance
// const bot = new TelegramBot(token, { polling: true });

// // MongoDB client with TLS fix
// const client = new MongoClient(mongoUri, {
//   tls: true,
//   tlsAllowInvalidCertificates: false,
// });

// let usersCollection;

// // =============== HELPER =================
// function getSender(msg) {
//   if (msg.from) {
//     if (msg.from.username) return `@${msg.from.username}`;
//     let name = [msg.from.first_name, msg.from.last_name]
//       .filter(Boolean)
//       .join(" ");
//     return name ? `${name} (id:${msg.from.id})` : `id:${msg.from.id}`;
//   }
//   if (msg.sender_chat) {
//     return `sender_chat: ${msg.sender_chat.title || msg.sender_chat.id}`;
//   }
//   return "unknown";
// }

// // =============== START BOT AFTER DB CONNECT =================
// async function connectDB() {
//   try {
//     await client.connect();
//     const db = client.db("telegramBotDB"); // database name
//     usersCollection = db.collection("users"); // collection name
//     console.log("✅ Connected to MongoDB Atlas");

//     // Start bot only after DB is ready
//     startBot();
//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//   }
// }

// // =============== BOT LOGIC =================
// function startBot() {
//   // Listen for any messages
//   bot.on("message", async (msg) => {
//     if (!usersCollection) return; // safety check

//     const sender = getSender(msg);
//     const chatId = msg.chat.id;

//     console.log(`Chat ID: ${chatId} | Sender: ${sender}`);

//     try {
//       // Check if user already exists
//       const exists = await usersCollection.findOne({ user: sender, group: chatId });
//       if (!exists) {
//         await usersCollection.insertOne({
//           user: sender,
//           group: chatId,
//           date: new Date(),
//         });

//         // Send notification to target chat
//         bot.sendMessage(targetChatId, `👤 New user detected: ${sender}`);
//       }
//     } catch (err) {
//       console.error("❌ DB Insert Error:", err);
//     }
//   });

//   // Command to list all users
//   bot.onText(/\/list/, async (msg) => {
//     try {
//       const users = await usersCollection.find().toArray();
//       if (users.length === 0) {
//         bot.sendMessage(msg.chat.id, "No users stored yet.");
//       } else {
//         const list = users
//           .map((u, i) => `${i + 1}. ${u.user} (Group: ${u.group})`)
//           .join("\n");
//         bot.sendMessage(msg.chat.id, `📋 Stored Users:\n${list}`);
//       }
//     } catch (err) {
//       console.error("❌ DB Fetch Error:", err);
//     }
//   });
// }

// // Connect DB and start bot
// connectDB();

// yesssssssssssssssssssssssssssssssssssssssssssss
const TelegramBot = require("node-telegram-bot-api");
const { MongoClient } = require("mongodb");

// ================== CONFIG ==================
const token = process.env.TG_BOT_TOKEN || "8199383847:AAEWlPCqJoNcyzWUDQnlTNsEK9eyK5Vw3CU"; // 🔑 bot token
const mongoUri = process.env.MONGO_URI || "mongodb+srv://heroo9466_db_user:WpBmy6oxB3RpD7uK@cluster0.rd6y0x6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // 🔑 MongoDB URI
const targetChatId = "-4803308889"; // chat where usernames will be sent

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

// MongoDB client with TLS fix
const client = new MongoClient(mongoUri, {
  tls: true,
  tlsAllowInvalidCertificates: false,
});

let usersCollection;

// =============== HELPER =================
function getSender(msg) {
  if (msg.from) {
    if (msg.from.username) return `@${msg.from.username}`;
    let name = [msg.from.first_name, msg.from.last_name]
      .filter(Boolean)
      .join(" ");
    return name ? `${name} (id:${msg.from.id})` : `id:${msg.from.id}`;
  }
  if (msg.sender_chat) {
    return `sender_chat: ${msg.sender_chat.title || msg.sender_chat.id}`;
  }
  return "unknown";
}

// =============== START BOT AFTER DB CONNECT =================
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("telegramBotDB"); // database name
    usersCollection = db.collection("users"); // collection name

    // Make username unique
    await usersCollection.createIndex({ user: 1 }, { unique: true });

    console.log("✅ Connected to MongoDB Atlas");
    startBot();
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}

// =============== BOT LOGIC =================
function startBot() {
  bot.on("message", async (msg) => {
    if (!usersCollection) return;

    const sender = getSender(msg);
    console.log(`Sender: ${sender}`);

    try {
      // Insert only if username does not exist
      const result = await usersCollection.updateOne(
        { user: sender }, // only username
        {
          $setOnInsert: {
            user: sender,
            date: new Date(),
            active: true, // default field
          },
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        bot.sendMessage(targetChatId, `👤 New user detected: ${sender}`);
      }
    } catch (err) {
      console.error("❌ DB Insert Error:", err);
    }
  });

  // Command to list all users
  bot.onText(/\/list/, async (msg) => {
    try {
      const users = await usersCollection.find().toArray();
      if (users.length === 0) {
        bot.sendMessage(msg.chat.id, "No users stored yet.");
      } else {
        const list = users
          .map((u, i) => `${i + 1}. ${u.user}`)
          .join("\n");
        bot.sendMessage(msg.chat.id, `📋 Stored Users:\n${list}`);
      }
    } catch (err) {
      console.error("❌ DB Fetch Error:", err);
    }
  });
}

// Connect DB and start bot
connectDB();
