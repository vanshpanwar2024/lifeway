# Lifeway Group Real Estate Website - Project Specification

## 1. Project Overview

- **Project Name:** Lifeway Group Website
- **Company:** Lifeway Group Real Estate
- **Industry:** Real Estate / Property Consultancy
- **Location:** Noida, Uttar Pradesh, India

### Objective

Create a professional, SEO-optimized website for Lifeway Group, a real estate company specializing in sale, purchase, leasing, property management, and investment advisory.

### Primary Goals

- Generate qualified property leads.
- Establish trust and credibility in the Delhi NCR market.
- Improve search engine visibility (SEO).
- Showcase properties and services with a modern UI.

---

## 2. Target Audience

### Primary

- Property buyers in Delhi NCR.
- Investors seeking affordable residential plots, apartments, houses, and farmhouses.

### Secondary

- Developers looking for channel partners.
- Property owners seeking management services.
- Professionals seeking careers in real estate.

---

## 3. Core Value Proposition

- **Affordability:** Focus on high-value, affordable residential options.
- **Comprehensive Support:** From property advisory to bank loan assistance and after-sales support.
- **Trust:** Emphasis on integrity, transparency, and expert market knowledge.

---

## 4. Website Structure & Navigation

### Top Navigation Menu

- Home
- About Us
- Services
- Why Us
- Properties
- Careers
- Contact
- **CTAs:** [Enquire Now] | [View Properties]

---

## 5. Page Content Details

### 5.1 Homepage

- **Hero Section:**
  - **Background:** Video from `/videos` folder.
  - **Headline:** Welcome to Lifeway Group.
  - **Subheading:** Lifeway Group is a Noida based real estate company and a trusted leader in the sale and leasing of affordable residential properties across Noida, Ghaziabad, Morni Hills, Ranikhet, Bhiwadi, Alwar and Rajasthan.
  - **CTAs:** [Explore Properties] [Get Consultation].
- **Company Intro:** Highlight status as an authorized channel partner.
- **Services Overview:** Cards for Buying, Selling, Leasing, Management, Advisory, and Loans.
- **Property Types:** Visual cards (using `/images`) for Plots, Apartments, Houses, and Farmhouses.
- **Google Map Integration:**
  ```html
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2049157460983!2d77.36404817615063!3d28.6236199844841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce544da5a9ebf%3A0x4024cbbabd66b412!2sKLJ%20Noida%20One!5e0!3m2!1sen!2sin!4v1773526528552!5m2!1sen!2sin"
    width="100%"
    height="300"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
  ```

### 5.2 About Us Page

- **Overview:** Focus on Gurugram/Noida roots and India-wide service.
- **Founder:** Mr. Vivek Panwar (Established 2012).
- **Vision:** To be the leading regional service provider and preferred workplace.
- **Mission:** Results-driven environment focused on long-term relationships.
- **Core Values:** Communication, Commitment, and Client Care.

### 5.3 Services Page

- **Real Estate Advisory:** Market-driven investment decisions.
- **Acquisition & Disposal:** Local, regional, and nationwide coverage.
- **Property Management:** Tenant management and maintenance.
- **Investment Advisory:** Data analysis and customized reports to maximize returns.

### 5.4 Why Choose Us

- **Proper Research:** History and market condition analysis.
- **Right Investments:** Partnerships with reputed developers.
- **Genuine Consultancy:** Personalized market intelligence.
- **After Sales/Bank Loans:** End-to-end documentation and loan processing support.

### 5.5 Properties Page

- **Categories:** Residential plots, Apartments, Houses, Farmhouses.
- **Card Details:** Image (from `/images`), Location, Price, Property Type, [Enquire] button.

### 5.6 Careers Page

- **Values:** Growth, Knowledge, Innovation, Teamwork.
- **Offerings:** Mentoring and performance-based growth.
- **Application:** Send CV to `info@lifewayinfra.in`.

### 5.7 Contact Page

- **Address:** Lifeway Group, 613A, 6th Floor, Block-C, KLJ Noida One, Sector-62, Noida, UP - 201309.
- **Form Fields:** Name, Phone, Email, Property Type, Message.

---

## 6. SEO Strategy

### Primary Keywords

`real estate company in Noida`, `affordable property in Noida`, `property in Delhi NCR`, `real estate consultant in Noida`, `property investment in Delhi NCR`, `residential plots in Noida`, `apartments in Noida`.

### Secondary & Local Keywords

`residential plots in Rajasthan`, `farmhouses for sale`, `Sector 62 Noida real estate`, `property dealer in Noida`.

---

## 7. Technical Requirements

- **Frontend:** Next.js / React with Tailwind CSS.
- **Backend:** Node.js or a Headless CMS.
- **Hosting:** Vercel or AWS.
- **Features:**
  - Mobile Responsive Design.
  - Lazy loading for images/videos.
  - Local Business Schema Markup.

---

## 8. Asset Directory Structure

- `/images/`: Logos, property thumbnails
- `/videos/`: Property drone shots (Hero homepage)
