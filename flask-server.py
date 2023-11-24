from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
import logging

app = Flask(__name__)
CORS(app)

# Rate Limiter Setup
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Logging Configuration
logging.basicConfig(level=logging.INFO)

# Replace 'your_api_key_here' with your actual ChatGPT API key
API_KEY = 'your_api_key_here'
API_URL = 'https://api.openai.com/v1/engines/gpt-4/completions'

@app.route('/chat', methods=['POST'])
@limiter.limit("5 per minute")  # Adjust the rate limit as needed
def chat():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(API_URL, headers=headers, json={"prompt": prompt, "max_tokens": 150})
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.HTTPError as err:
        logging.error(f"HTTP error occurred: {err}")
        return jsonify({"error": "API request failed"}), response.status_code
    except Exception as err:
        logging.error(f"An error occurred: {err}")
        return jsonify({"error": "An error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)