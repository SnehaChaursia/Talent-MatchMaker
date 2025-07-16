# Talent Matchmaker Lite - Frontend

A modern React application with TailwindCSS for matching clients with creative talent.

## 🎨 Features

- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Matching**: Instant results with detailed scoring breakdown
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Error Handling**: Graceful error states and loading indicators
- **Portfolio Links**: Direct access to creator portfolios

## 🛠️ Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

The frontend will run on `http://localhost:5173` (Vite default)

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Form.jsx          # Main form component
│   │   └── ResultCard.jsx    # Individual result display
│   ├── pages/
│   │   └── Home.jsx          # Main page component
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles (Tailwind)
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
└── package.json              # Dependencies
```

## 🎯 Usage

1. **Fill the Form**: Enter location, skills, budget, and style preferences
2. **Submit**: Click "Find Matches" to search for creators
3. **Review Results**: View top 3 matches with detailed scoring
4. **Contact**: Click portfolio links to reach out to creators

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient design
- **Card-based Layout**: Clean result cards with hover effects
- **Color-coded Scores**: Visual score indicators (green/blue/yellow/red)
- **Loading States**: Smooth loading animations
- **Responsive Grid**: Adapts to different screen sizes
- **Icon Integration**: Emoji icons for better UX

## 🔧 Configuration

### TailwindCSS
The project uses TailwindCSS for styling with a custom configuration:
- Responsive design utilities
- Custom color schemes
- Animation classes
- Focus states for accessibility

### API Integration
- Backend endpoint: `http://localhost:3001/api/match`
- CORS enabled for cross-origin requests
- Error handling with user-friendly messages

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy with previews

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist` folder to your hosting provider
3. Configure backend URL in production

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile**: Single column layout
- **Tablet**: Optimized spacing and sizing
- **Desktop**: Side-by-side form and results
- **Large Screens**: Centered layout with max-width

## 🎨 Component Details

### Form Component
- Input validation and formatting
- Loading states with spinner
- Error handling
- Responsive design

### ResultCard Component
- Score-based color coding
- Detailed match breakdown
- Portfolio link integration
- Hover effects and animations

## 🔗 Backend Integration

The frontend expects the backend to be running on `http://localhost:3001` with the following API:

- **POST** `/api/match` - Submit matching request
- **GET** `/api/health` - Health check

## 📝 Development Notes

- Built with React 19 and Vite
- Uses modern ES6+ features
- TailwindCSS for styling
- No external UI libraries (pure CSS)
- Optimized for performance

## 🐛 Troubleshooting

1. **Backend Connection**: Ensure backend is running on port 3001
2. **CORS Issues**: Backend has CORS enabled for localhost
3. **Build Errors**: Check Node.js version (recommended: 18+)
4. **Styling Issues**: Ensure TailwindCSS is properly configured
