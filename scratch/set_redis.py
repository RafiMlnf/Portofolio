import urllib.request
import json

url = "https://unified-jaybird-137172.upstash.io/"
headers = {
    "Authorization": "Bearer gQAAAAAAAhfUAAIgcDE0ZTZiOGNkZjFhYWY0OTRmYjFmMWU4ODQzMjI4YjU5OQ",
    "Content-Type": "application/json"
}

detail = {
    "objective": "Membangun aplikasi pesan instan lokal (intranet) privat, aman, dan berkinerja tinggi yang sepenuhnya berjalan di memori (RAM) tanpa memerlukan database atau pencatatan log (logless). ChatMD dirancang sebagai solusi komunikasi internal instan yang volatile untuk memfasilitasi pertukaran pesan dan file secara cepat di lingkungan kantor tanpa membebani memori laptop berspesifikasi rendah.",
    "techStack": [
        {
            "label": "Client Stack",
            "items": ["Python", "websocket-client", "cryptography (AES)", "msvcrt (non-blocking IO)", "PyInstaller"]
        },
        {
            "label": "Server Stack",
            "items": ["Node.js", "ws (WebSocket server)", "UDP Broadcast (Auto Discovery)"]
        }
    ],
    "highlights": [
        "Token Discovery System: Server melakukan broadcast UDP pada port 8766 agar client dapat menemukan IP server secara otomatis di jaringan intranet tanpa konfigurasi manual.",
        "E2EE Message Encryption: Pesan dienkripsi secara end-to-end menggunakan modul Cryptography Python dengan algoritma AES sebelum dikirimkan melalui WebSocket.",
        "Volatile In-Memory Chat: Seluruh riwayat percakapan hanya tersimpan di RAM server/client dan akan terhapus sepenuhnya saat aplikasi ditutup untuk menjamin privasi mutlak.",
        "Console-based UI with Non-blocking Input: Antarmuka Command Prompt (CMD) Windows yang super ringan menggunakan input non-blocking sehingga user dapat mengetik tanpa terputus ketika pesan baru masuk.",
        "Direct File Transfer: Fitur drop file ke terminal console untuk pengiriman file instan antar client di jaringan intranet."
    ],
    "githubUrl": "https://github.com/RafiMlnf/ChatMD",
    "liveUrl": "https://github.com/RafiMlnf/ChatMD/releases"
}

payload = ["SET", "project:detail:14", json.dumps(detail)]

req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers, method="POST")
try:
    with urllib.request.urlopen(req) as response:
        print("RESPONSE FROM REDIS:")
        print(response.read().decode())
except Exception as e:
    print("Error:", e)
