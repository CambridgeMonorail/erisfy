# Stock Screener Specification

## Overview

The mockups aim to visualize a user-friendly and intuitive interface for a next-generation stock screener. The design must simplify the process of selecting and combining filters while providing actionable insights and dynamic feedback. These mockups will focus on core screens, panels, and interactive features.

For detailed information on the available filters, refer to the [Stock Screener Filters](./stock%20screener%20filters.md) document.

### **Implementation Context**

All pages described in this document will be implemented under a drop-down "Stock Screener" menu within the application. This menu will serve as the central hub for navigating between the different features and tools of the stock screener.

---

## Screens and Panels

### **1. Homepage/Dashboard** (Stock Screener Section)

This page should be added as an option in the top-level "Stock Screener" drop-down menu.

#### **Purpose**

- Serve as the landing page where users start their stock screening journey.
- Highlight filter recommendations and saved presets.

#### **Key Areas**

1. **Filter Library Sidebar**:
   - Positioned on the left or as a collapsible panel.
   - Group filters into intuitive categories (e.g., "Fundamentals," "Technicals," "Ownership," "Performance").
   - Include a search bar at the top for quick filter lookup.
   - "Recommended Filters" section to display AI-driven suggestions based on user goals or recent trends.

2. **Main Workspace**:
   - Large area in the center for dynamic content (e.g., results, visualizations).
   - Includes a "Get Started" section for new users with onboarding tips and common presets.

3. **Quick Actions Toolbar**:
   - Positioned at the top or right, containing shortcuts to:
     - Saved filters/presets.
     - Recent searches.
     - Help/FAQ.

4. **Footer Section**:
   - Links to additional resources like tutorials, glossary terms, and support.

---

### **2. Filter Selection Screen** (Stock Screener Section)

This page should be added as an option in the top-level "Stock Screener" drop-down menu.

#### **Purpose**

- Allow users to explore and select filters interactively.

#### **Key Areas**

1. **Filter Category View**:
   - Display filter categories as expandable panels or tabs.
   - Each category should list its respective filters (e.g., under "Fundamentals," include P/E, EPS, etc.).

2. **Filter Details Panel**:
   - Appears on hover or click for each filter.
   - Includes:
     - A definition of the filter.
     - An example of how it affects results.
     - Visual aids like mini-charts or graphs.

3. **Filter Search Bar**:
   - Positioned prominently at the top.
   - Supports auto-complete and tagging (e.g., "P/E under 20").

4. **Dynamic Filter Preview**:
   - Updates in real-time as users select filters.
   - Shows the number of matching stocks and key metrics for context.

---

### **3. Results Page** (Stock Screener Section)

This page should be added as an option in the top-level "Stock Screener" drop-down menu.

#### **Purpose**

- Display stocks matching selected filters with interactive sorting and visualization options.

#### **Key Areas**

1. **Filter Summary Panel**:
   - Collapsible panel at the top or side.
   - Displays applied filters with options to adjust or remove them inline.

2. **Results Table**:
   - Standard table format with sortable columns for key metrics (e.g., ticker, P/E, EPS).
   - Include interactive features like:
     - Inline charts for quick metric comparisons.
     - Expandable rows to view detailed stock information.

3. **Visualization Section**:
   - Positioned below or as a toggleable area.
   - Interactive charts (e.g., scatterplots, heatmaps) showing how stocks compare across selected metrics.

4. **Save and Export Toolbar**:
   - Buttons for saving current filter combinations as a preset.
   - Export options (e.g., CSV, PDF).

---

### **4. AI Assistance Panel** (Stock Screener Section)

This panel should be accessible from an option in the top-level "Stock Screener" drop-down menu.

#### **Purpose**

- Provide natural language interaction and real-time recommendations.

#### **Key Areas**

1. **Chat Interface**:
   - Panel or widget on the right.
   - Accepts user queries like "Find undervalued tech stocks with high EPS growth" and translates them into filters.

2. **Recommendations Output**:
   - Displays suggested filters and results inline.
   - Includes plain-language explanations (e.g., "These stocks are undervalued based on their P/E ratios compared to the industry average").

3. **Interactive Examples**:
   - Pre-filled queries users can click to understand the tool's capabilities.

---

### **5. Smart Start** (Stock Screener Section)

This flow should be initiated from the top-level "Stock Screener" drop-down menu.

#### **Purpose**

- Guide new users through filter selection and the platform's key features.

#### **Key Areas**

1. **Welcome Screen**:
   - Simple design introducing the tool’s purpose.
   - Call-to-action buttons: "Learn the Basics," "Start Screening," or "Explore Presets."

2. **Guided Steps**:
   - Highlight essential features (e.g., filter library, results visualization).
   - Include tooltips and progress indicators.

3. **Quick Setup Questionnaire**:
   - Ask users about their investment goals (e.g., "Are you looking for growth, value, or income?").
   - Use responses to auto-suggest filters and presets.

---

### **6. Stock Detail Page** (Stock Screener Section)

This page should be accessible via links in the "Results Page" or as an option in the top-level "Stock Screener" drop-down menu.

#### **Purpose**

- Provide in-depth information about a specific stock, enabling users to analyze its performance and metrics.

#### **Key Areas**

1. **Overview Section**:
   - Display key details such as current price, P/E ratio, market cap, and dividend yield.
   - Include a mini chart showing recent performance (e.g., last 1 month).

2. **Performance Metrics Panel**:
   - List critical metrics like EPS growth, ROE, ROA, and profitability ratios.
   - Show visual indicators (e.g., sparklines, trend arrows) for quick interpretation.

3. **News and Events Section**:
   - Include recent news headlines and upcoming events (e.g., earnings report dates).
   - Allow users to click through for more details.

4. **Interactive Charting Tool**:
   - Offer customizable charts for analyzing historical performance (e.g., price, volume, moving averages).

5. **Peer Comparison Section**:
   - Show how the stock compares to industry peers in key metrics.

6. **Save and Add to Portfolio Button**:
   - Let users save the stock to a watchlist or add it to a specific portfolio.

---

## General Design Requirements

All pages and components will be implemented using **shadcn/ui** components for UI consistency and **Tailwind CSS** for efficient styling and responsiveness.

1. **Consistency**:
   - Use a cohesive design system (e.g., Material Design, Tailwind UI).
   - Maintain uniform spacing, font sizes, and color schemes.

2. **Responsiveness**:
   - Ensure layouts adapt seamlessly across devices and screen sizes.

3. **Accessibility**:
   - Follow WCAG 2.2 AA standards (e.g., keyboard navigation, high-contrast mode).

4. **Interactivity**:
   - Use hover effects, animations, and transitions for a polished experience.
   - Provide instant feedback for actions like filter selection or query submission.

---

This specification outlines the necessary details for creating mockups that address user needs while delivering a modern, intuitive stock screener experience. Let me know if additional details or adjustments are required.
