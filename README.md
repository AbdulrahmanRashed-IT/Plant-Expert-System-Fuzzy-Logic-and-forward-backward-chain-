# 🌿 Plant Expert System

The **Plant Expert System** is a web-based application designed to help users diagnose plant diseases and pest problems based on visible symptoms. Using an expert system approach, it provides possible causes and recommendations for treatment.

---

## 🚀 Features

* Interactive **plant disease and pest diagnosis**.
* Database of **symptoms, pests, and diseases**.
* **Rule-based expert system** for intelligent analysis.
* Simple, intuitive **web interface**.
* **MySQL** backend for data storage and management.
* Modular **PHP API** for extensibility.

---

## 🛠️ Tech Stack

| Layer    | Technologies Used                    |
| -------- | ------------------------------------ |
| Frontend | HTML, CSS, JavaScript                |
| Backend  | PHP (Procedural + Class-based logic) |
| Database | MySQL                                |
| Server   | Apache / XAMPP / LAMP Stack          |

---

## 📂 Project Structure

```
plant_expert_system/
├── api/               # PHP API endpoints
├── classes/           # Expert system core logic (ExpertSystem.php)
├── config/            # Database connection configuration
├── css/               # Frontend styling
├── database/          # SQL dump (sikar.sql)
├── img/               # Plant, pest, and disease images
├── index.html         # Main UI
└── package.json       # Project metadata (optional)
```

---

## ⚙️ Installation and Setup

### Prerequisites

* PHP 8.x or later
* MySQL 5.7+ or MariaDB
* Apache server (e.g., XAMPP or LAMP)

### Steps

1. **Clone this repository**

   ```bash
   git clone https://github.com/YourUsername/plant_expert_system.git
   ```

2. **Move project to server directory**

   ```
   C:\xampp\htdocs\plant_expert_system
   ```

3. **Import the database**

   * Open `phpMyAdmin`
   * Create a new database named `sikar`
   * Import the file `database/sikar.sql`

4. **Configure database connection**

   * Edit `config/database.php`
   * Update with your MySQL credentials:

     ```php
     $this->conn = new mysqli("localhost", "root", "", "sikar");
     ```

5. **Run the application**

   * Start Apache and MySQL in XAMPP
   * Visit [http://localhost/plant_expert_system](http://localhost/plant_expert_system)

---

## 🧠 How It Works

1. The user selects **symptoms** observed on their plant.
2. The expert system uses a **rule-based inference engine** (defined in `ExpertSystem.php`) to analyze data.
3. It matches symptoms against known rules in the database.
4. The system returns **possible diseases or pests** and suggested treatments.

-----

## 💡 Future Improvements

* Add AI or machine learning for better accuracy.
* Include plant image recognition.
* Multi-language support.
* Mobile-friendly responsive design.

---
## 🪴 License

This project is licensed under the **MIT License** — feel free to modify and use it for your own research or learning.

---

## ⭐ Acknowledgment

Special thanks to all open-source contributors and agricultural data references used in building this expert system.
