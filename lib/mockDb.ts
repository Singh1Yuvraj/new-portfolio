import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "mock_db.json");

// Helper to read database
function readDb(): any[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading mock DB:", error);
    return [];
  }
}

// Helper to write database
function writeDb(users: any[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing mock DB:", error);
  }
}

// Deep set helper for dotted paths (e.g., "settings.template")
function setPath(obj: any, pathStr: string, value: any) {
  const parts = pathStr.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined || current[part] === null) {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

// Deep array add-to-set helper (e.g., "settings.templateHistory")
function addToSetPath(obj: any, pathStr: string, value: any) {
  const parts = pathStr.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined || current[part] === null) {
      current[part] = {};
    }
    current = current[part];
  }
  const lastPart = parts[parts.length - 1];
  if (!Array.isArray(current[lastPart])) {
    current[lastPart] = [];
  }
  if (!current[lastPart].includes(value)) {
    current[lastPart].push(value);
  }
}

export const MockUser = {
  async findOne(query: any) {
    const users = readDb();
    
    return users.find((user) => {
      for (const key in query) {
        let queryVal = query[key];
        let userVal = user[key];

        // Handle case-insensitive/exact searches or string comparisons
        if (key === "username" && typeof queryVal === "string") {
          if (!user.username) return false;
          return user.username.toLowerCase() === queryVal.toLowerCase();
        }

        if (key === "email" && typeof queryVal === "string") {
          return user.email.toLowerCase() === queryVal.toLowerCase();
        }

        // General exact match
        if (userVal !== queryVal) {
          return false;
        }
      }
      return true;
    }) || null;
  },

  async findById(id: string) {
    const users = readDb();
    return users.find((user) => user._id === id) || null;
  },

  async create(doc: any) {
    const users = readDb();
    const newUser = {
      _id: `mock_user_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`,
      profile: {
        fullName: "",
        title: "",
        bio: "",
        avatarUrl: "",
        location: "",
        email: doc.email || "",
        resumeUrl: "",
      },
      skills: [],
      projects: [],
      experience: [],
      education: [],
      socials: {
        github: "",
        linkedin: "",
        twitter: "",
        website: "",
      },
      settings: {
        template: "minimal",
        isPublic: true,
        templateHistory: [],
      },
      ...doc,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeDb(users);
    return newUser;
  },

  async findByIdAndUpdate(id: string, update: any, options?: any) {
    const users = readDb();
    const userIndex = users.findIndex((user) => user._id === id);
    if (userIndex === -1) {
      return null;
    }

    const user = users[userIndex];

    // Handle Mongoose-style $set and $addToSet
    if (update.$set) {
      for (const pathStr in update.$set) {
        setPath(user, pathStr, update.$set[pathStr]);
      }
    } else {
      // If there is no explicit $set operator, but they passed a flat object to merge
      for (const key in update) {
        if (!key.startsWith("$")) {
          user[key] = update[key];
        }
      }
    }

    if (update.$addToSet) {
      for (const pathStr in update.$addToSet) {
        addToSetPath(user, pathStr, update.$addToSet[pathStr]);
      }
    }

    user.updatedAt = new Date().toISOString();
    users[userIndex] = user;
    writeDb(users);

    return user;
  },
};
