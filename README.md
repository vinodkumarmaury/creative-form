

# 🚀 Lead Management Application  

A Next.js-based lead management system that allows prospects to submit their details via a public form and provides an internal UI for managing leads.  

---

## 📌 Features  

- **Public Lead Form** – Allows users to submit their information.  
- **Internal Leads List UI** – Secure dashboard for managing leads.  
- **Authentication** – Protects internal routes.  
- **File Upload** – Supports uploading resumes/CVs.  
- **State Management** – Tracks lead status (PENDING → REACHED_OUT).  
- **Validation** – Ensures required fields are correctly filled.  
- **API Routes** – Handles form submissions and lead updates.  
- **Responsive UI** – Works on different screen sizes.  

---

## ⚡ Prerequisites  

Ensure you have the following installed:  

- **[Node.js](https://nodejs.org/) (v16 or later)**  
- **[Git](https://git-scm.com/)**  

---

## 📥 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/vinodkumarmaury/creative-form.git
cd creative-form
```

### 2️⃣ Install Dependencies  
Using **npm**:  
```bash
npm install
```  
Or using **Yarn**:  
```bash
yarn install
```

### 3️⃣ Run the Development Server  
Using **npm**:  
```bash
npm run dev
```  
Or using **Yarn**:  
```bash
yarn dev
```
🔹 The app will be available at **[http://localhost:3000/](http://localhost:3000/)**  

---

## 🚀 Running the Production Build (Optional)  

To build and run the app in production mode:  

Using **npm**:  
```bash
npm run build
npm run start
```  
Or using **Yarn**:  
```bash
yarn build  
yarn start  
```

---

## 🔑 Environment Variables  

If required, create a `.env.local` file in the root directory and set values as per `.env.example`.  

---

## 🛠 Testing (If Implemented)  

Run tests using:  

Using **npm**:  
```bash
npm run test
```  
Or using **Yarn**:  
```bash
yarn test
```

---

## 📌 Notes  

- 📝 **Public Lead Form** → Available at **`/lead-form`**  
- 🔒 **Internal Leads List UI** → Available at **`/admin`** (authentication required)  

---

## 📄 Documentation  

For more details, check the **design document** in the repository.  

📌 **GitHub Repo** → [Creative Form](https://github.com/vinodkumarmaury/creative-form)  

🚀 **Happy Coding!** 🎉  

