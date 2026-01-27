# ☕ Cafe Scroll - Brussels Brewery

A modern, interactive coffee shop website built with Next.js 15, featuring stunning scroll-based animations and immersive visual storytelling.

## ✨ Features

- **🎬 Cinematic Scroll Animation**: 218-frame WebP animation sequence that responds to scroll position
- **⚡ Performance Optimized**: WebP images for faster loading and better compression
- **📱 Fully Responsive**: Beautiful design that works on all devices
- **🎨 Modern UI/UX**: Clean, minimalist design with smooth animations
- **🚀 Next.js 15**: Built with the latest Next.js features and App Router
- **💨 Framer Motion**: Smooth, performant animations throughout
- **🎯 TypeScript**: Full type safety and better developer experience

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js
- **Icons**: Lucide React
- **Charts**: Recharts
- **Linting**: ESLint with Next.js config

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cafe-scroll
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cafe-scroll/
├── app/
│   ├── components/
│   │   ├── home/           # Home page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── BrandStory.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Locations.tsx
│   │   │   └── ProductShowcase.tsx
│   │   ├── layout/         # Layout components
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── lumina-interactive-list.tsx
│   │   └── CoffeeScroll.tsx # Main scroll animation component
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── silent-ocean-frames/ # 218 WebP animation frames
├── .agent/                 # AG-Kit agent configurations
└── ...config files
```

## 🎯 Key Components

### CoffeeScroll Component
The centerpiece of the application - a scroll-driven animation that cycles through 218 WebP frames to create a cinematic coffee brewing experience.

**Features:**
- Smooth scroll-to-frame mapping
- Optimized WebP image loading
- Responsive canvas rendering
- Loading progress indicator
- Text overlays with scroll-based animations

### Performance Optimizations
- **WebP Images**: All 218 animation frames converted from JPG to WebP for ~30% size reduction
- **Lazy Loading**: Images load progressively as needed
- **Canvas Optimization**: Efficient rendering with device pixel ratio handling
- **Smooth Animations**: Framer Motion spring animations for fluid interactions

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

The project uses a carefully crafted design system with:
- **Typography**: Alfa Slab One for headings, Source Sans Pro for body text
- **Colors**: Dark theme with warm coffee-inspired accents
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable UI components with consistent styling

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for tablet and desktop
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Efficient rendering across all device sizes

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Platforms
This Next.js app can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific variables:
```bash
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind CSS
The project uses Tailwind CSS v4. Configuration can be found in `tailwind.config.js`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Coffee animation frames from Silent Ocean collection
- Design inspiration from modern coffee shop aesthetics
- Built with love for the coffee community ☕

---

**Made with ❤️ and lots of ☕**
