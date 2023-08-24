import requests

url="https://backend-messenger.onrender.com/reviews"

response = requests.get(url)
decoded=response.json()
print(decoded[0]["designation"])