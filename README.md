# Quillos

An AI-powered marketing campaign generator that creates multi-platform marketing assets in minutes. Upload an image, provide context, and watch Quillos generate professional marketing copy and visuals for Facebook, Instagram, and Google Ads.

## Features

- **AI-Powered Content Generation**: Uses Claude Sonnet 4.5 for marketing copy and Google Gemini for image generation
- **Multi-Platform Support**: Generate assets optimized for:
  - Facebook Ads (headlines, primary texts, images in multiple formats)
  - Instagram Ads (captions, stories, images)
  - Google Ads (headlines, descriptions, banner ads)
- **Social Media Preview**: See how your content looks on TikTok, Facebook, Threads, and Twitter
- **Conditional Image Generation**: Upload your own image or let AI create one based on your description
- **One-Click Copy**: Easily copy all generated text content to clipboard
- **Asset Management**: Images stored in IndexedDB, text content in localStorage for optimal performance
- **Real-time Preview**: See your marketing poster before generating full asset suite

## Tech Stack

### Frontend
- **React 19** - UI library
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management
- **TanStack Start** - Full-stack React framework
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Icon library

### Backend & AI
- **Anthropic Claude API** (claude-sonnet-4-5-20250929) - Marketing copy generation
- **Google Gemini API** (gemini-2.5-flash-image) - Image generation
- **TanStack Start Server Functions** - Type-safe API layer

### Data & Storage
- **IndexedDB** - Browser storage for generated images (50MB+ quota)
- **localStorage** - Text content storage
- **Drizzle ORM** - Database toolkit (optional for future features)
- **PostgreSQL** - Database (optional for future features)

### Development Tools
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing
- **Biome** - Linting and formatting
- **React Testing Library** - Component testing

## Prerequisites

- **Node.js** 18+ or 20+
- **pnpm** 8+ (recommended package manager)
- **Anthropic API Key** - Get one from [Anthropic Console](https://console.anthropic.com/)
- **Google AI Studio API Key** - Get one from [Google AI Studio](https://aistudio.google.com/)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quillos
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_AI_STUDIO_API_KEY=your_google_ai_studio_api_key_here
```

## Development

Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm serve` | Preview production build |
| `pnpm start` | Run production server |
| `pnpm test` | Run tests with Vitest |
| `pnpm lint` | Lint code with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm check` | Run linting and formatting checks |

### Database Scripts (Optional)

| Command | Description |
|---------|-------------|
| `pnpm db:generate` | Generate database migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:pull` | Pull schema from database |
| `pnpm db:studio` | Open Drizzle Studio |

## Project Structure

```
quillos/
├── src/
│   ├── routes/                    # File-based routes
│   │   ├── __root.tsx            # Root layout with HTML head
│   │   ├── index.tsx             # Home page - campaign input
│   │   ├── social-media.tsx      # Social media preview page
│   │   └── ads/                  # Platform-specific pages
│   │       ├── facebook.tsx      # Facebook Ads assets
│   │       ├── instagram.tsx     # Instagram Ads assets
│   │       └── google.tsx        # Google Ads assets
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── asset-section.tsx # Asset display section
│   │   │   ├── button.tsx        # Button component
│   │   │   ├── file-upload.tsx   # File upload component
│   │   │   ├── glass-card.tsx    # Glassmorphism card
│   │   │   ├── page-layout.tsx   # Page wrapper
│   │   │   └── side-nav.tsx      # Navigation sidebar
│   │   ├── Header.tsx            # App header
│   │   └── preview-card.tsx      # Marketing preview card
│   ├── lib/
│   │   ├── ai.ts                 # AI utility functions
│   │   ├── ai.server.ts          # Server-side AI integration
│   │   ├── assets.server.ts      # Asset generation logic
│   │   ├── indexeddb.ts          # IndexedDB storage utilities
│   │   ├── use-platform-assets.ts # Asset loading hook
│   │   └── use-assets-with-images.ts # Combined asset hook
│   ├── styles.css                # Global styles
│   └── entry-client.tsx          # Client entry point
├── public/                       # Static assets
├── .env                          # Environment variables (create this)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite configuration
└── biome.json                    # Biome linting config
```

## How It Works

### 1. Campaign Input (Home Page)

1. **Upload Hero Image**: Upload the main image for your campaign
2. **Add Description** (Optional): Provide context to influence AI generation
3. **Create Preview**: AI analyzes the image and generates:
   - Marketing headline
   - Body copy
   - Keywords
   - Poster image (AI-generated if description provided, otherwise uses uploaded image)

### 2. Generate Assets

Click "Generate Assets" to create platform-specific content:
- **10 images** in different aspect ratios (square, vertical, landscape, etc.)
- **3-5 headlines** per platform
- **3-5 primary texts/descriptions** per platform

All optimized for each advertising platform's specifications.

### 3. Review & Export

Navigate to platform-specific pages to:
- View all generated assets
- Copy text content with one click
- Download images individually or in bulk
- Preview social media content

## Key Features Explained

### Conditional Poster Generation

- **With Description**: AI generates a new poster based on your description and extracted campaign details
- **Without Description**: Uses your uploaded image directly

### Independent Loading States

- Preview generation shows spinner in preview card
- Asset generation shows spinner on button
- Both processes are independent and non-blocking

### Storage Strategy

- **IndexedDB**: Stores 10 generated images (bypasses localStorage 5-10MB limit)
- **localStorage**: Stores text content (headlines, descriptions)
- **Custom Hook**: Combines both sources for seamless data access

### Copy Functionality

All text sections (headlines, primary texts, descriptions) feature copy buttons that:
- Copy all items in the section
- Format with appropriate line breaks
- Use browser Clipboard API

## Testing

Run tests with Vitest:
```bash
pnpm test
```

Tests are located in `__tests__` directories or colocated as `*.test.ts` files.

## Building for Production

Build the application:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm serve
```

Run the production server:
```bash
pnpm start
```

The build output will be in `.output/` directory.

## Code Quality

This project follows strict code quality standards:

- **Biome** for linting and formatting (no ESLint or Prettier)
- **No inline comments** - code is self-documenting through clear naming
- **Component decomposition** - small, focused, reusable components
- **Type safety** - Full TypeScript coverage
- **Avoid `useEffect`** - Prefer derived state and event handlers

Check code quality:
```bash
pnpm check
```

## Environment Variables

Required environment variables in `.env`:

```env
# Anthropic API (Claude)
ANTHROPIC_API_KEY=sk-ant-...

# Google AI Studio (Gemini)
GOOGLE_AI_STUDIO_API_KEY=AI...
```

## Browser Support

- Modern browsers with IndexedDB support
- Chrome/Edge 80+
- Firefox 75+
- Safari 14+

## Contributing

1. Follow Biome formatting standards
2. Write tests for new features
3. Keep components small and focused
4. Use TypeScript strictly
5. Avoid inline comments

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
