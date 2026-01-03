import requests
import time
import sys

def telegram_spam(bot_token, chat_id, message, count=100, delay=1):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    for i in range(1, count + 1):
        payload = {
            'chat_id': chat_id,
            'text': f"{message} - {i}/{count}"
        }
        
        try:
            response = requests.post(url, data=payload)
            if response.status_code == 200:
                print(f"[+] Sent {i}/{count}")
            else:
                print(f"[-] Failed {i}: {response.text}")
        except Exception as e:
            print(f"[!] Error: {e}")
        
        time.sleep(delay)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python telegram_spam.py <bot_token> <chat_id> <message> [count] [delay]")
        sys.exit(1)
    
    bot_token = sys.argv[1]
    chat_id = sys.argv[2]
    message = sys.argv[3]
    count = int(sys.argv[4]) if len(sys.argv) > 4 else 100
    delay = int(sys.argv[5]) if len(sys.argv) > 5 else 1
    
    telegram_spam(bot_token, chat_id, message, count, delay)
