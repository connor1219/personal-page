# ![Personal Portfolio](https://connor1219.github.io/icon/rainbow-trout.png)

➜ https://connor1219.github.io/

This is my personal portfolio website built with Next.js, React, and TypeScript. Features an interactive project carousel with dual modes showcasing both my software development projects and cool fish I've caught.

## Features

### Interactive Project Carousel

The website features a dynamic project carousel that displays different content based on the selected mode:

- **Developer Mode**: Showcases software development projects including web applications, systems programming, and open-source contributions
- **Fishing Mode**: Displays cool fish I've caught

### Responsive Design

The portfolio is fully responsive and optimized for both desktop and mobile viewing:

- Desktop layout with side-by-side navigation arrows and centered content
- Mobile-optimized layout with inline navigation controls
- Smooth transitions and fade effects between project slides
- Touch-friendly interface elements

### Modern Tech Stack

Built with modern web technologies for optimal performance:

- **Next.js 15** for server-side rendering and static site generation
- **React 19** with TypeScript for type-safe component development
- **Material-UI (MUI)** for consistent design system and components
- **React Icons** for scalable vector icons
- **Emotion** for CSS-in-JS styling

## User Manual

### General Navigation

The website consists of a main landing page with two primary sections:

1. **Left Panel**: Personal information including name, current role, and social media links (LinkedIn, GitHub)
2. **Right Panel**: Interactive project carousel displaying either development projects or fishing content

### Mode Switching

Users can toggle between two distinct modes by clicking the icon in the bottom-right corner:

- **Developer Mode** (default): Shows software projects with descriptions and links
- **Fishing Mode**: Displays cool fish I've caught

When switching modes, the carousel smoothly transitions with a fade effect, and the title updates to reflect the current context ("Software Developer" or "Fisherman").

### Project Carousel Controls

#### Desktop Experience
- Use the left and right arrow buttons on either side of the project card to navigate
- Click on the dots below the carousel to jump directly to a specific project
- Hover effects provide visual feedback for interactive elements

#### Mobile Experience
- Compact arrow controls are positioned inline with navigation dots
- Optimized touch targets for easy interaction

### Project Information

Each project card displays:
- **Title**: Project or catch name
- **Description**: Detailed information about the project or fishing experience
- **Image**: Photos showcasing the work or catch
- **Links**: External links to live projects, repositories, or additional resources

## Installation

Ensure you have Node.js (v18 or higher) and Yarn installed on your system.

1. Clone the repository:
```bash
git clone https://github.com/connor1219/connor1219.github.io.git
cd connor1219.github.io
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Development Instructions

### Running Locally

- **Development mode**: `yarn dev` - Runs with hot reloading
- **Production build**: `yarn build` - Creates optimized production build
- **Start production server**: `yarn start` - Serves the production build locally
- **Linting**: `yarn lint` - Runs ESLint to check code quality

### Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ProjectCarousel.tsx    # Main carousel component
│   └── ProjectInfoCard.tsx    # Individual project card
├── data/               # Static data and content
│   └── projects.ts     # Project and fishing data
└── pages/              # Next.js pages
    ├── _app.tsx        # App configuration
    └── index.tsx       # Main landing page
```

### Adding New Projects

To add new projects or fishing content:

1. Open `src/data/projects.ts`
2. Add new entries to either the `GENERAL` or `FISHING` category
3. Include required fields: `id`, `imageSrc`, `title`, `body`, and optional `link`
4. Add corresponding images to the `public/icon/` directory

### Customization

- **Colors and themes**: Modify MUI theme settings in `_app.tsx`
- **Layout adjustments**: Update responsive breakpoints and spacing in component files
- **Content**: Edit project data in `src/data/projects.ts`
- **Social links**: Update LinkedIn and GitHub URLs in `index.tsx`

## Testing Instructions

### Running Locally

To test the application locally:

1. Run `yarn dev` to start the development server
2. Navigate to `http://localhost:3000`
3. Test both desktop and mobile layouts using browser developer tools
4. Verify carousel functionality in both modes
5. Test all external links and navigation elements