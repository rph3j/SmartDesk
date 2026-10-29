# 🚀 Smart Desk
*A simple project, integrating Raspberry pi which sensors to help with work and time management*
<br><br>
This project was developed as a diploma thesis. It covers a topic like sensor integration with Raspberry pi and using sensor data to help menage time and work.

---

## 💻 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js
* **Narzędzia:** Visual Studio Code, Raspberry Pi 4B

---

## ✨ Features

* 🕹️ Manual control
* 📊 Data statistics
* 🌐 Web interface
* 💡 Light management

---

## 🛠️ How run this project?

### Prerequisites
* Rasberry Pi min ver. 4 (I run project on this version! I haven't test code on version bellow 4 and don't know if there is some modules problems)
* HC-SR04 sensor
* MOS 5V module
* HT-22 sensor
* 12V RGB led strip
* Node.js and React.JS

### Installation

1. Copy repository:
   ```bash
   git clone https://github.com/rph3j/SmartDesk
   ```
2. Go to project folder:
   ```bash
   cd SmartDesk
   ```

4. Install all dependencies:
   ```bash
   cd server
   npm install
   cd..
   cd frontend
   npm install
   ```
5. Installing mariadb:
    ```bash
    sudo apt update
    sudo apt install mariadb-server mariadb-client -y
    
    sudo systemctl start mariadb
    sudo systemctl enable mariadb
    
    sudo mariadb -u root
    ```
6. Preparing a database:
    ```bash
   CREATE DATABASE Time;
   USE Time;

   CREATE TABLE moja_tabela (
       id INT PRIMARY KEY AUTO_INCREMENT,
       date DATE NOT NULL,
       timeS INT NOT NULL
   );

   CREATE USER 'PiCon'@'localhost' IDENTIFIED BY 'Your_Password';

   GRANT ALL PRIVILEGES ON Time.* TO 'PiCon'@'localhost';

   FLUSH PRIVILEGES;
   ```
7. Configure Config.js file:
   * Port – specifies the port on which the server should listen
   * dbHost – the hostname assigned to the database
   * dbUser – the username for the database account (PiCon)
   * dbPass – the password for the database user (Your_Password)
   * dbName – the name of the database (Time)
   * timeAtTheDesk – the name of the module that manages time spent at the desk
   * MeasurementDate – the name of the storage field that holds the date associated with the recorded time.
     
8. Starting server:
    ```bash
    cd server
    npm run dev
    ```
9. Starting frontend:
    ```bash
    cd frontend
    npm run dev
    ```
10. The Node.js module and React.js module should run in the same time.
---

## 📟 Some electronic schematics

### Connecting the HC-SR04
<img width="387" height="313" alt="Zrzut ekranu 2026-10-29 183709" src="https://github.com/user-attachments/assets/9ffcfc1c-950b-4fde-85d3-ca3c97f6b386" />

### Connecting the led strip
<img width="362" height="391" alt="Zrzut ekranu 2026-10-29 183724" src="https://github.com/user-attachments/assets/ee40d638-5fe6-442b-b946-67819cbd18e7" />

### Connecting the HT-22
<img width="369" height="240" alt="Zrzut ekranu 2026-10-29 183731" src="https://github.com/user-attachments/assets/89a8670a-381c-426c-9188-30258f4feb24" />

### Connecting MOS 5V
Unfortunately, I do not have a prepared schematic for this module at the moment. I have included it in this section to highlight its presence as the module responsible for lighting management (e.g., in a room).


## 🖥️ WWW Interface and what you can do with it!

### Main page
On this page, you can control the main functions of the project.<br><br>
<img width="599" height="279" alt="Zrzut ekranu 2026-10-29 184051" src="https://github.com/user-attachments/assets/60a1bb85-8bec-4ed2-992f-faf114271e05" />
# The left windowis
Is usage to display time, temperature, humidity and to change distance and time of distance sensor activation (HC-SR04). This sensor check if you are in desk.<br><br>
<img width="434" height="313" alt="Zrzut ekranu 2026-10-29 190049" src="https://github.com/user-attachments/assets/d47bfd4b-a971-416c-857a-85b8b10b5aef" />
# The right top window
This part menage light, led colour and display general data about time spending in desk. You can change Light mode to automatic. This mode shod of light and start led when you sit on desk.
* Light ON<br><br><img width="427" height="130" alt="Zrzut ekranu 2026-10-29 184102" src="https://github.com/user-attachments/assets/c8aa4235-2bf2-419c-bd85-b5a0e0299cbc" />

* Auto mode<br><br><img width="414" height="129" alt="Zrzut ekranu 2026-10-29 184110" src="https://github.com/user-attachments/assets/1b2813b4-ddc1-4d72-83c4-075056b5adf0" />

* Led color panel<br><br><img width="605" height="200" alt="Zrzut ekranu 2026-10-29 184115" src="https://github.com/user-attachments/assets/f7701f73-2a4f-493d-9d1f-372140d87c0e" />

* Time data<br><br><img width="600" height="205" alt="Zrzut ekranu 2026-10-29 184120" src="https://github.com/user-attachments/assets/837ded2f-35ac-42a0-8316-8727daa0705d" />

# The right bottom window
In this window you can see daily time spent at desk.<br><br>
<img width="381" height="317" alt="Zrzut ekranu 2026-10-29 184124" src="https://github.com/user-attachments/assets/702c8ab2-b96c-48d7-88c3-b93555b8cad1" />


## 👤 Autor

* Stworzone przez: **Piotr (rph3j) Wyrwas**
* Kontakt mailowy: *1piotr.wyrwas.DEV@gmail.com*
