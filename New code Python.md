# Define the project structure
project_name = "news-explorer-backend"
base_path = Path("/mnt/data") / project_name

# Folder structure
folders = [
    "controllers",
    "models",
    "routes",
    "middlewares",
    "utils"
]

# Create directories
for folder in folders:
    (base_path / folder).mkdir(parents=True, exist_ok=True)

# File contents
files = {
    ".gitignore": "node_modules/\n.env\nrequest.log\nerror.log\n",
    "package.json": """{
  "name": "news-explorer-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "celebrate": "^15.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-winston": "^4.2.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3",
    "validator": "^13.9.0",
    "winston": "^3.8.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
""",
    "models/user.js": """const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('User', userSchema);
""",
    "models/article.js": """const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  source: { type: String, required: true },
  link: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Invalid URL'],
  },
  image: {
    type: String,
    required: true,
    validate: [validator.isURL, 'Invalid image URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('Article', articleSchema);
""",
    "middlewares/auth.js": """const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next(new UnauthorizedError('Authorization required'));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid token'));
  }
};
"""
}

# Write files
for path, content in files.items():
    file_path = base_path / path
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content)

# Create a zip file
zip_path = Path("/mnt/data") / f"{project_name}.zip"
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for folder_path, _, filenames in os.walk(base_path):
        for filename in filenames:
            file_full_path = os.path.join(folder_path, filename)
            arcname = os.path.relpath(file_full_path, base_path.parent)
            zipf.write(file_full_path, arcname)

zip_path.name
