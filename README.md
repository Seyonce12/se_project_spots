Spots
Description
Spots is a responsive photo-sharing application designed to provide a seamless browsing experience across devices. Users can explore beautiful photo cards showcasing diverse locations, interact with the content through like buttons, and easily navigate through a clean and user-friendly interface. This project demonstrates modern web development techniques with a focus on responsiveness and maintainability.
---
Features
- Interactive Cards: Photo cards with titles and descriptions, featuring like buttons for user interaction.
- Responsive Design: Optimized for desktop, tablet, and mobile devices using CSS media queries.
- User Profiles: Includes a user avatar, name, description, and profile editing functionality.
- Add New Post Button: A placeholder button for future post submission functionality.
---
Technologies Used
- HTML5: Semantic elements for clear structure and accessibility.
- CSS3: Responsive layout with Flexbox and Grid techniques.
- BEM Methodology: Ensures maintainable and scalable CSS code.
- Normalize.css: Standardizes styling across browsers for a consistent look.
- Google Fonts: Incorporates modern typography with fallback fonts.
- GitHub Pages: Deployed for easy access and sharing.
---
Layout Explanation
 Cards Layout
- Flexbox: Used for aligning elements inside card containers.
  - Properties like `justify-content: space-between;` and `align-items: center;` ensure proper spacing and alignment.
- Grid: Used for structuring the card list on the page, allowing easy adaptation for different screen sizes.
Adaptive Design
- Media Queries: Adjust layouts for:
  - Desktop (default view).
  - Tablet (`max-width: 768px`).
  - Mobile (`max-width: 480px`).
- Example: Card dimensions are dynamically adjusted in `index.css` to ensure usability on smaller screens.
---
 Semantic Tags
- Examples used:
  - `<header>`, `<main>`, `<section>`, `<footer>`: Define the page's structure.
  - `<h1>` and `<h2>`: Organize content hierarchy.
  - `<button>`: Represents interactive elements.
- Importance:
  - Enhances accessibility for screen readers.
  - Improves SEO by providing meaningful content structure.
---
BEM Methodology
- Block: Independent entities (e.g., `.profile`, `.card`).
- Element: Parts of a block (e.g., `.profile__avatar`, `.card__title`).
- Modifier: Variations of a block or element (e.g., `.profile__avatar--small`).
- File Structure:
  - Each block has its own CSS section, keeping styles modular and easy to manage.
---
Fonts and Normalize.css
- Font Connection: Fonts are linked in `index.css` via Google Fonts.
- Alternative Fonts:
  - Primary: `Poppins`.
  - Fallbacks: `Arial`, `Helvetica`, `sans-serif`.
- Normalize.css:
  - Ensures consistent styling across browsers by resetting default styles.
---
Challenges and Learnings
- Responsive Design**: Ensuring the layout adapts smoothly across devices without breaking.
- Card Alignment**: Balancing content alignment while maintaining a visually appealing design.
- Path Issues**: Debugging broken image links due to incorrect relative paths.
Learnings
- Mastery of Flexbox and Grid for layout design.
- Effective use of media queries to implement responsive designs.
- Importance of semantic tags for accessibility and SEO.
---
## Deployment
- **Live Demo**: [View Spots on GitHub Pages]
https://seyonce12.github.io/se_project_spots/

   Video: https://youtu.be/axGMeobqZro
   