# Bharat Yatra - Travel Guide

This is a Next.js application that serves as a travel guide for India, using a local JSON dataset.

## Setup

1.  **Data File**: Ensure you have the `full_nested_states.js` file in the `data` directory.
    - Path: `data/full_nested_states.js`
    - Content: It should export a constant named `states`.
    ```javascript
    export const states = [ ... ];
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open Browser**: Navigate to `http://localhost:3000`.

## Project Structure

-   `/app`: Next.js App Router pages.
    -   `/states`: List of all states.
    -   `/states/[stateId]`: State details and districts.
    -   `/states/[stateId]/[districtId]`: District details and places list (with search/filter).
    -   `/states/[stateId]/[districtId]/[placeId]`: Place details, gallery, and hotels.
-   `/components`: Reusable UI components.
    -   `Layout.jsx`: Shared layout (Navbar/Footer).
    -   `SearchBar.jsx`: Client-side search with debounce.
    -   `Filters.jsx`: Category filters.
    -   `HotelCard.jsx`: Display hotel info.
    -   `ImageGallery.jsx`: Lightbox for images.
-   `/lib`: Utility functions.
    -   `data.js`: Data fetching helpers.
    -   `geo.js`: Geographic calculations.
-   `/data`: Contains the dataset.

## Features

-   **Static Generation**: All pages are statically generated for optimal performance.
-   **Client-side Interaction**: Search and filtering work instantly on the client side.
-   **Responsive Design**: Fully responsive UI using Tailwind CSS.
-   **No External APIs**: Runs entirely on the local dataset.
