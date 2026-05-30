# 🌿 Anti-Greenwashing Scorecard

> **Web Data UNLOCKED Hackathon Submission**

![Demo Preview](https://img.shields.io/badge/Status-Live_Demo-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Bright Data](https://img.shields.io/badge/Bright_Data-Scraping_Browser-blue?style=for-the-badge)

An **Enterprise AI Orchestration Dashboard** that evaluates e-commerce product pages for "greenwashing" (fake eco-friendly claims). 

Live Demo: [https://web-data-unlocked-hackathon.vercel.app/](https://web-data-unlocked-hackathon.vercel.app/)

---

## 🚀 The Problem

Brands increasingly use words like "Conscious," "Eco-Friendly," and "Sustainable" as marketing buzzwords to sell products, without backing them up with transparent supply chains or verifiable certifications. This is known as **Greenwashing**. Consumers find it nearly impossible to manually verify the reality behind these claims while shopping online.

## 💡 Our Solution

The **Anti-Greenwashing Scorecard** acts as an instant auditor. By simply pasting an e-commerce product URL into the dashboard, our multi-agent AI system:
1. **Bypasses anti-bot protections** on e-commerce sites to extract the raw product text and claims.
2. **Analyzes the claims** against a massive LLM knowledge base to check for authentic ESG (Environmental, Social, and Governance) practices versus vague buzzwords.
3. **Generates a "Trust Score"** and breaks down the brand's sustainability across 5 key metrics: Materials, Labor, Carbon, Transparency, and Circularity.

---

## 🛠️ Tech Stack & Architecture

- **Frontend (UI/UX)**: Built with **Next.js** (App Router) and **React**. Features a cinematic dark-mode glassmorphism design, utilizing **Framer Motion** for fluid animations and **Recharts** for the dynamic Radar Chart data visualization.
- **Data Extraction**: Powered by **Bright Data's Scraping Browser** connected via `puppeteer-core`. This enterprise-grade infrastructure allows the backend to effortlessly navigate complex e-commerce websites and extract the raw HTML body text without being blocked by Cloudflare or Datadome.
- **AI Analysis Engine**: Integrates **Google Gemini 2.5 Pro** (`@google/genai`). The scraped webpage text is passed to Gemini with a highly specific prompt to evaluate sustainability claims and output a structured JSON response for the frontend to render.

---

## 🎥 Features

- **Live Multi-Agent Terminal**: A real-time hacker-style console that visually demonstrates the complex steps happening in the backend (e.g., bypassing CAPTCHAs, analyzing DOM elements).
- **Radar Chart Visualization**: Breaks down the AI's Trust Score into specific ESG categories.
- **Dynamic Adaptability**: The dashboard automatically extracts the product name from any URL and tailors the report contextually.

---

## 💻 Running it Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/swatiicfai/Web-Data-UNLOCKED-Hackathon.git
   cd Web-Data-UNLOCKED-Hackathon
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Environment Variables:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   BRIGHT_DATA_USERNAME="your_bright_data_username"
   BRIGHT_DATA_PASSWORD="your_bright_data_password"
   GEMINI_API_KEY="your_gemini_api_key"
   ```
   *(Note: Without these keys, the app will run in "Demo Mode" and provide simulated dynamic data for demonstration purposes).*

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

*Built with ❤️ for the Web Data UNLOCKED Hackathon.*
