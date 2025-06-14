# Contributing to VenueFinder PH

Thank you for your interest in contributing to VenueFinder PH! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/venuefinder-ph.git
   cd venuefinder-ph
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature already exists or is planned
- Provide a clear description of the feature
- Explain the use case and benefits
- Include mockups or examples if helpful

### 🔧 Code Contributions

#### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

#### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(search): add advanced filtering options
fix(map): resolve marker clustering issue
docs(readme): update installation instructions
```

## 🏗️ Development Guidelines

### Code Style

- **TypeScript** - Use TypeScript for all new code
- **ESLint** - Follow the existing ESLint configuration
- **Prettier** - Code formatting is handled automatically
- **Tailwind CSS** - Use Tailwind for styling

### Component Guidelines

1. **File Organization**
   ```
   src/
   ├── components/     # Reusable components
   ├── pages/         # Route components
   ├── contexts/      # React contexts
   ├── hooks/         # Custom hooks
   ├── lib/          # Utilities
   └── types/        # TypeScript types
   ```

2. **Component Structure**
   ```typescript
   // Import external libraries
   import React from 'react'
   import { useNavigate } from 'react-router-dom'
   
   // Import internal modules
   import { ComponentProps } from '../types'
   import { useCustomHook } from '../hooks'
   
   // Component definition
   export default function Component({ prop }: ComponentProps) {
     // Component logic
     return (
       <div className="component-styles">
         {/* Component JSX */}
       </div>
     )
   }
   ```

3. **Naming Conventions**
   - Components: `PascalCase`
   - Files: `PascalCase.tsx`
   - Variables/Functions: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple browsers and devices
- Verify responsive design

## 🎨 Design Guidelines

### UI/UX Principles

1. **Consistency** - Follow existing design patterns
2. **Accessibility** - Ensure WCAG compliance
3. **Performance** - Optimize for speed and efficiency
4. **Mobile-First** - Design for mobile, enhance for desktop

### Color Palette
- Primary: Blue (`#2563eb`)
- Secondary: Gray (`#6b7280`)
- Success: Green (`#10b981`)
- Warning: Yellow (`#f59e0b`)
- Error: Red (`#ef4444`)

### Typography
- Headings: `font-bold`
- Body: `font-normal`
- Captions: `text-sm`

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Include TypeScript types for all props
- Document API endpoints and data structures

### README Updates
- Update README for new features
- Include screenshots for UI changes
- Update installation instructions if needed

## 🔍 Review Process

### Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Explain what and why
3. **Testing**: Describe how you tested
4. **Screenshots**: Include for UI changes
5. **Breaking Changes**: Note any breaking changes

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design works
- [ ] Accessibility considerations

## 🏷️ Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Notes
- Document all changes
- Include migration guides for breaking changes
- Credit contributors

## 🤝 Community

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's code of conduct

### Getting Help
- Check existing documentation
- Search through issues
- Ask questions in discussions
- Contact maintainers if needed

## 📞 Contact

- **Project Maintainer**: [Your Name]
- **Email**: info@venuefinderph.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/venuefinder-ph/issues)

Thank you for contributing to VenueFinder PH! 🎉