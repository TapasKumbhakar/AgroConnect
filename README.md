# Agricultural Resource Management System (ARMS)

## 🌾 Overview

The Agricultural Resource Management System (ARMS) is a comprehensive web application designed to help farmers manage their agricultural resources, get crop recommendations, and access valuable farming information. This system provides a modern, user-friendly interface for agricultural data management and decision-making support.

**NEW**: Now features a beautiful landing page with authentication, modern React frontend with Tailwind CSS, and comprehensive user management system!

## ✨ Features

### 🏠 Landing Page & Authentication
- **Beautiful Landing Page**: Modern, attractive homepage with smooth animations
- **User Authentication**: Secure login/logout functionality with user session management
- **Comprehensive Sections**: 
  - Hero section with compelling call-to-action
  - About Us with mission and values
  - Features showcase with interactive cards
  - Farmer testimonials and success stories
  - Contact information and form
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Demo Mode**: Easy testing with any email/password combination

### 🧑‍🌾 Farmer Management
- **Farmer Registration**: Complete farmer profiles with contact details, land information, and farming experience
- **Detailed Profiles**: Track land size, soil pH, irrigation type, soil type, and preferred crops
- **CRUD Operations**: Create, view, update, and delete farmer records
- **Modern UI**: Beautiful card-based interface with smooth animations

### 🌱 Crop Management
- **Crop Database**: Comprehensive database of crops with detailed information
- **Seasonal Planning**: Crops categorized by growing seasons (Spring, Summer, Monsoon, Winter)
- **Growth Information**: Track growth duration, water requirements, and optimal soil conditions
- **Smart Recommendations**: Get crop suggestions based on soil pH levels
- **Visual Cards**: Color-coded crop cards with intuitive design

### 📊 Analytics Dashboard
- **Farm Statistics**: View total farmers, land area, and crop distribution
- **Location Analysis**: Farmer distribution by geographic location
- **Popular Crops**: Most preferred crops among registered farmers
- **Real-time Data**: Live updates of agricultural metrics
- **Beautiful Charts**: Visual data representation with progress bars

### 📚 Resource Library
- **Educational Content**: Articles, videos, guides, and tools
- **Categorized Resources**: Organized by farming techniques, pest control, soil management, irrigation, and marketing
- **Expert Content**: Resources from agricultural experts and institutions
- **Easy Access**: Quick links to external resources

### 🎨 Modern User Interface
- **React + Tailwind CSS**: Beautiful, responsive design
- **Smooth Animations**: Engaging transitions and hover effects
- **Mobile-First**: Optimized for all device sizes
- **Dark/Light Themes**: Modern color schemes (expandable)
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling library

### Frontend (NEW!)
- **React 18**: Modern JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests

### Additional Tools
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **Body-parser**: Request body parsing middleware

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- Git

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ARCP
   ```

2. **Backend Setup**
   ```bash
   # Install backend dependencies
   npm install
   
   # Configure environment variables
   # Edit .env/.env with your MongoDB connection string:
   # MONGO_URI=mongodb://127.0.0.1:27017/myARCP
   # PORT=5000
   # NODE_ENV=development
   
   # Start the backend server
   npm start
   ```

3. **Frontend Setup (React App)**
   ```bash
   # Navigate to client directory
   cd client
   
   # Install frontend dependencies
   npm install
   
   # Start the React development server
   npm start
   ```

4. **Access the Applications**
   - **React Frontend**: `http://localhost:3000` (Modern UI)
   - **Legacy Frontend**: `http://localhost:5000` (Original HTML)
   - **API Endpoints**: `http://localhost:5000/api`

### Alternative Setup (Docker) - Coming Soon
```bash
docker-compose up
```

## 📁 Project Structure

```
ARCP/
├── app.js                    # Main backend application
├── package.json              # Backend dependencies
├── .env/
│   └── .env                  # Environment variables
├── models/
│   └── user.js               # Database models (Farmer, Crop, Resource)
├── public/
│   └── index.html            # Legacy HTML frontend
├── client/                   # NEW: React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   ├── Dashboard.js
│   │   │   ├── FarmerManagement.js
│   │   │   ├── CropManagement.js
│   │   │   ├── Analytics.js
│   │   │   ├── Resources.js
│   │   │   └── Toast.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css         # Tailwind CSS styles
│   ├── package.json          # Frontend dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   └── postcss.config.js
└── README.md                 # Project documentation
```

## 🔧 API Endpoints

### Farmer Management
- `GET /api/farmers` - Get all farmers
- `POST /api/farmers` - Create new farmer
- `GET /api/farmers/:id` - Get specific farmer
- `PUT /api/farmers/:id` - Update farmer
- `DELETE /api/farmers/:id` - Delete farmer

### Crop Management
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Add new crop
- `GET /api/crops/recommendations/:soilPh` - Get crop recommendations

### Resource Management
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Add new resource
- `GET /api/resources?category=<category>&type=<type>` - Filter resources

### Analytics
- `GET /api/analytics` - Get comprehensive farm analytics

## 🌟 Key Features Explained

### Smart Crop Recommendations
The system analyzes soil pH levels and recommends suitable crops based on:
- Optimal pH range for each crop
- Seasonal growing patterns
- Water requirements
- Growth duration

### Responsive Design
- Mobile-friendly interface
- Modern gradient styling
- Interactive tabs and cards
- Real-time form validation

### Data Analytics
- Automatic calculation of farm statistics
- Visual representation of farmer distribution
- Crop popularity analysis
- Land utilization metrics

## 🔐 Data Models

### Farmer Schema
```javascript
{
  name: String (required),
  landSize: Number (required),
  soilPh: Number (required, 0-14),
  location: String (required),
  preferredCrop: String (required),
  contactNumber: String,
  email: String,
  farmingExperience: Number,
  irrigationType: String (enum),
  soilType: String (enum),
  timestamps: true
}
```

### Crop Schema
```javascript
{
  name: String (required, unique),
  season: String (enum),
  soilPhRange: { min: Number, max: Number },
  waterRequirement: String (enum),
  growthDuration: Number,
  description: String,
  timestamps: true
}
```

### Resource Schema
```javascript
{
  title: String (required),
  type: String (enum),
  category: String (enum),
  content: String,
  url: String,
  author: String,
  timestamps: true
}
```

## 🚀 Future Enhancements

### Planned Features
- **Weather Integration**: Real-time weather data for farming decisions
- **Market Prices**: Live crop prices and market trends
- **Expert Consultation**: Connect farmers with agricultural experts
- **Mobile App**: Native mobile application for Android/iOS
- **IoT Integration**: Support for smart farming sensors
- **Machine Learning**: Predictive analytics for crop yield and pest management

### Technical Improvements
- **User Authentication**: Login system for farmers and administrators
- **Data Visualization**: Charts and graphs for better analytics
- **PDF Reports**: Downloadable farming reports
- **Multi-language Support**: Localization for different regions
- **Offline Capability**: PWA features for offline access

## 🤝 Contributing

We welcome contributions from the agricultural and technology communities!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution
- New crop data and information
- UI/UX improvements
- Additional agricultural resources
- Bug fixes and optimizations
- Documentation improvements

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 🆘 Support

For support, questions, or suggestions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for troubleshooting

## 🙏 Acknowledgments

- Agricultural extension services for crop data
- MongoDB community for database guidance
- Express.js community for web framework support
- All farmers and agricultural experts who provided domain knowledge

---

**Built with ❤️ for the farming community** 🌾

*Empowering farmers with technology for better agricultural outcomes*
