import requests

data={"userId":"64d906e4d7ef51d9a3b37fd7"}


url="https://backend-messenger.onrender.com/user"

r = requests.post(url, data=data)
print(r)    