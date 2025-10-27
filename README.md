# ByProduct Bazaar

India's First Eco-Marketplace for Industrial Waste Trading - A React-based B2B platform for connecting waste sellers and buyers.

## Features

- **Homepage**: Modern landing page with hero section, how it works, services, and featured listings
- **Sell Waste**: Comprehensive form for listing industrial waste materials with file uploads and preview functionality
- **Browse Waste**: Search and filter waste listings by category, location, and keywords
- **Responsive Design**: Mobile-first approach with clean, professional UI
- **React Router**: Client-side routing for seamless navigation

## Tech Stack

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

## Color Palette

- Primary Green: #388E3C
- Accent Blue: #42A5F5
- Background: #F4F9F4
- Text: #2E2E2E
- Buttons: #2E7D32

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd byproduct-bazaar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   └── Navigation.js          # Reusable navigation component
├── pages/
│   ├── HomePage.js           # Landing page component
│   ├── SellPage.js           # Sell waste form component
│   └── BrowsePage.js         # Browse listings component
├── App.js                    # Main app component with routing
├── index.js                  # App entry point
└── index.css                 # Global styles and Tailwind imports
```

## Routes

- `/` - Homepage
- `/sell` - Sell waste form
- `/browse` - Browse waste listings

## Features in Detail

### Homepage
- Hero section with call-to-action buttons
- How it works section (3-step process)
- Services offered (Storage, Transport, Escrow Payment)
- Featured waste listings
- Call-to-action section

### Sell Waste Form
- Product name and category selection
- Quantity and pricing inputs
- Location selection (City & State)
- File uploads for images and certificates
- Rich text description
- Preview functionality before submission
- Form validation

### Browse Listings
- Search functionality
- Category and location filters
- Responsive grid layout
- Listing cards with images and details
- Load more functionality

## Customization

### Colors
Update the color palette in `src/index.css` by modifying the custom CSS variables.

### Styling
The app uses Tailwind CSS for styling. Custom styles can be added to `src/index.css`.

### Adding New Pages
1. Create a new component in the `src/pages/` directory
2. Add the route to `src/App.js`
3. Update the navigation in `src/components/Navigation.js`

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify/Vercel
1. Push your code to GitHub
2. Connect your repository to Netlify or Vercel
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact info@byproductbazaar.com 