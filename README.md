# 📦 Package Manager

**Package Manager** is a web-based solution designed to make shopkeeping and inventory tracking effortless. Built as a monorepo, it provides a seamless interface for shop admins and their crew to manage product stock using QR codes and real-time reporting.

---

## 🚀 Features

- 🧑‍💼 **Admin Panel**
  - Generate unique QR codes for products.
  - View real-time inventory movement (In/Out).
  - Track monthly growth and performance via dashboard.

- 📲 **Worker Interface**
  - Scan QR codes to report product movement (In or Out).
  - User-friendly scanning workflow with error feedback and retry options.
  - Role-based access (Admins, Crew, Workers).

- 📊 **Dashboard**
  - Visual representation of inventory data.
  - Filter and analyze product movement by date or status.
  - Monitor performance and stock trends.

- 🧾 **Inventory Management**
  - Easily check what’s in stock and what’s out.
  - Maintain detailed product logs.
  - Organized and intuitive interface for managing hundreds of items.

---

## 📦 Tech Stack

-   **Next.js** (App Router + Server Actions)
    
-   **Tailwind CSS** + **ShadCN UI**
    
-   **Prisma** + **PostgreSQL**
    
-   **UploadThing** (for images if needed)
    
-   **Clerk** (for authentication)
    
-   **react-infinite-scroll-component** (for smooth QR code scan history)
    
-   **Turborepo** (for monorepo management)
    

----------

## 🛠️ Getting Started

```
# Clone the repository
git clone https://github.com/your-username/package-manager.git
cd package-manager

# Install dependencies
pnpm install  # or npm install / pnpm install
```

