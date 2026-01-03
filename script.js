// Telegram Spammer Frontend Logic
function log(msg) {
    const logContainer = document.getElementById('logContainer');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

async function startSpam() {
    const botToken = document.getElementById('botToken').value.trim();
    const chatId = document.getElementById('chatId').value.trim();
    const message = document.getElementById('message').value.trim();
    const count = parseInt(document.getElementById('count').value);
    const delay = parseInt(document.getElementById('delay').value) * 1000;

    if (!botToken || !chatId || !message) {
        alert('❌ Fill all fields!');
        return;
    }

    log('🚀 Starting Telegram Spam Attack...');
    log(`Target: ${chatId} | Messages: ${count}`);

    // Simulate sending via GitHub (mock)
    for (let i = 1; i <= count; i++) {
        log(`📤 Sending message ${i}/${count}: "${message.substring(0, 30)}..."`);
        
        // Simulate API call to Telegram Bot
        // In real implementation, this would be done via backend/worker
        setTimeout(() => {
            // Mock success
            if (i % 10 === 0) {
                log(`✅ ${i} messages sent.`);
            }
        }, i * delay);

        if (i >= 50) { // Safety break for demo
            log('⚠️ Demo limited to 50 messages. Real version uses GitHub Actions.');
            break;
        }
    }

    log('🎯 Spam attack queued. Check GitHub Actions for real execution.');
    
    // For real GitHub integration, trigger via fetch to GitHub API
    triggerGitHubAction(botToken, chatId, message, count, delay);
}

// GitHub Actions Trigger (Simulated)
async function triggerGitHubAction(botToken, chatId, message, count, delay) {
    log('🔗 Connecting to GitHub Actions...');
    
    // This would be actual fetch to GitHub API with secrets
    // Example structure for .github/workflows/spam.yml
    const workflowConfig = `
name: Telegram Spam Attack

on:
  workflow_dispatch:
    inputs:
      bot_token:
        description: 'Bot Token'
        required: true
      chat_id:
        description: 'Target Chat ID'
        required: true
      message:
        description: 'Spam Message'
        required: true
      count:
        description: 'Message Count'
        default: '100'
      delay:
        description: 'Delay in seconds'
        default: '1'

jobs:
  spam:
    runs-on: ubuntu-latest
    steps:
      - name: Send Spam
        run: |
          for i in \$(seq 1 \${{ github.event.inputs.count }}); do
            curl -s -X POST "https://api.telegram.org/bot\${{ github.event.inputs.bot_token }}/sendMessage" \\
              -d "chat_id=\${{ github.event.inputs.chat_id }}" \\
              -d "text=\${{ github.event.inputs.message }} - \$i"
            sleep \${{ github.event.inputs.delay }}
          done
    `;
    
    log('📁 GitHub Actions config ready. Deploy manually or via API.');
    console.log('Workflow YAML:', workflowConfig);
    
    // Offer download of config
    const blob = new Blob([workflowConfig], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'telegram_spam.yml';
    a.click();
    
    log('⬇️ Config downloaded. Place in .github/workflows/ and add secrets.');
}
