# FB-HUNT

Facebook Phishing Tool (For Educational Purposes Only)This Node.js-based tool simulates a Facebook phishing attack by hosting a fake login page and capturing login credentials.

It supports two hosting modes:

1. Localhost 
2. Ngrok (for public URL access)


Captured login details (username and password) are printed to the terminal.

## ⚠️ Disclaimer

This tool is created only for educational and ethical hacking / penetration testing purposes.
Do NOT use this tool for any malicious or illegal activity.
The developer is not responsible for any misuse or legal issues caused by using this tool.
Always get proper authorization before testing any system.

## Working On
1. Kali Linux ( Tested By DEXTER )
2. Termix ( Android ) (Tested By DEXTER )
3. Windows 10 ( Tested By DEXTER )

## Installation
1. Clone the Repo
```bash
git clone https://github.com/dexter-the-hunter
```
2. Go to Cloned File
```bash
cd fb-hunt
```
3. Install Required Packages
```bash
npm install express body-parser ngrok dotenv
```
4. Or use this if you're in the project folder with a valid package.json:

```bash
npm install
```
5.  How to Run
```bash
node server.js
```

Choose Hosting Mode

1 — Run on localhost

2 — Run using Ngrok (public URL)

## 🔑 Example Output

```bash
--- Login Attempt ---
Time: 4/13/2025, 5:00:00 PM
Username: testuser@example.com
Password: secret123
--------------------
```


## 👤 Author

Owner : DEXTER ( TAFFY ) | Taffy Creations

