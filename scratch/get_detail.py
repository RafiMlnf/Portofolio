import urllib.request
import json

url = "https://unified-jaybird-137172.upstash.io/get/project:detail:1"
headers = {
    "Authorization": "Bearer gQAAAAAAAhfUAAIgcDE0ZTZiOGNkZjFhYWY0OTRmYjFmMWU4ODQzMjI4YjU5OQ"
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print("RESULT FROM REDIS:")
        print(data.get("result"))
except Exception as e:
    print("Error:", e)
