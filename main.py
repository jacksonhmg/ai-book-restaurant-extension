import requests
# Headers
headers = {
'Authorization': 
"sk-mf9yzzu7pga2f5g5dax9d08sm9iagdvcljye10x1y6hgnsjpuzxrx6v2ytvrxik569"
}

# Data
data = {
'phone_number': '(415) 445-4556',
'task': 'Book a reservation at the restaurant',
'voice_id': 1,
'reduce_latency': True,
'request_data': {"reservation_time":"8pm on Monday November 6, 2023","number_of_people":"2"}
}

# API request 
requests.post('https://api.bland.ai/call', json=data, headers=headers)