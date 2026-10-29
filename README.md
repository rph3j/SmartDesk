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
3. Create venv environment:
   *Important note: * picamera2 library requires installation via system package manager. Make sure you open your venv to system package!
   ```bash
   python -m venv --system-site-packages .venv
   source .venv/bin/activate
   ```

4. Install all dependencies:
   ```bash
   python -m pip install flask keras pygame opencv-python
   sudo apt install python3-picamera2
   
   ```
5. Starting WWW interface:
    ```bash
    python3 main.py
    ```
7. Starting machine learning section:<br>
   ***Important note:** make sure you check this file and comment unnesesery line!*
      ```bash
      cd Learning
      python3 learning.py  
      ```
---
## 🖥️ WWW Interface and what you can do with it!

### Manual Driving
W tej sekcji dostępny jest podgląd z kamery w czasie rzeczywistym; możesz tu również sterować robotem (sprawdź instrukcję obsługi kontrolera poniżej).
Dwa suwaki po lewej stronie służą do ustawienia stałej prędkości lub całkowitego zablokowania ruchu robota. This feature is using meanlu to better collecting learning data.
<img width="1895" height="834" alt="Manual" src="https://github.com/user-attachments/assets/c14cfcbb-5100-490a-8773-01821d131438" />

### Automatic Driving
In this section wy have view to learning charts, and buttons for two variant of models. You can change used model in autoRunMain.py file.
<img width="1808" height="652" alt="Auto" src="https://github.com/user-attachments/assets/1f469390-f48f-42eb-96f0-38ce97c01c90" />

### Machine Learning
This section wos designet to visualize learning proces but is more convenient to use your command line, like i mension before.
<img width="1882" height="632" alt="Learn" src="https://github.com/user-attachments/assets/1ee2ae19-2a24-4c1c-8cde-882655705de4" />

## 🕹️ Controller manual
* Right trigger - this trigger is usage to apply speed to engine. The further it is pressed, the greater the percentage of engine power that is applied
* Left joystick - use for detecting a percentage change and applying this change to the vehicle's steering.
* Right joystick - It is used to detect omnidirectional motion and transmit this change to the vehicle's steering system.
* B - Starting and stopping collecting data for self driving. This button collect only turn data.
* A nad X - Starting and stopping collecting data for self driving. This buttons collect data for speed and omnidirectional motios.

## 👤 Autor

* Stworzone przez: **Piotr (rph3j) Wyrwas**
* Kontakt mailowy: *1piotr.wyrwas.DEV@gmail.com*
