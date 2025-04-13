# 🎯 Facebook Phishing Simulation Tool (For Educational Purposes Only)

> ⚠️ **Disclaimer**  
> This tool is created **only for educational and ethical hacking / penetration testing purposes**.  
> Do **NOT** use this tool for any malicious or illegal activity.  
> The developer is **not responsible** for any misuse or legal issues caused by using this tool.  
> Always get **proper authorization** before testing any system.  

---

## 📂 Project Description

This Node.js-based tool simulates a Facebook phishing attack by hosting a fake login page and capturing login credentials.

It supports two hosting modes:

- **Localhost**
- **Ngrok** (for public URL access)

Captured login details (username and password) are printed to the terminal.

---

## 🛠️ Features

- Fake Facebook login page
- Ngrok integration to expose the tool publicly
- Logs credentials with timestamp
- Automatically saves Ngrok token to `.env` file
- Clear ASCII banner and console UI

---

## 🚀 How to Run

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/fb-phishing-tool.git
cd fb-phishing-tool
npm install express body-parser ngrok dotenv
node server.js 
