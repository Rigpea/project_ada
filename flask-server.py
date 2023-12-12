from flask import Flask, request, jsonify, json
from flask_cors import CORS  # Import CORS
from google.cloud.sql.connector import Connector
import requests
import mysql.connector
import sqlalchemy
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

OPENAI_API_KEY = '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'
client = OpenAI(api_key=OPENAI_API_KEY)

#init the database connection variables
DB_CONNECTION_STRING = 'credible-art-407019:us-central1:adadatabase'
DB_USER = 'root'
DB_PASSWORD = 'DCo^MbA*-cSo\$R`'
DB_NAME = 'user'

connector = Connector()
#set up the connection
def getconn():
    return connector.connect(
        DB_CONNECTION_STRING,
        "pymysql",
        user=DB_USER,
        password=DB_PASSWORD,
        db=DB_NAME
    )
pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn
)
@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({"message": "Hello from Flask!"})




@app.route('/add_basic_user', methods=['POST'])
def add_basic_user():
    try:
        user_data = request.json
        user_id = user_data.get('user_id')
        email = user_data.get('email')
        display_name = user_data.get('display_name', '')
        hobbies = user_data.get('hobbies', [])
        blocked_sites = user_data.get('blocked_sites', [])

        if not user_id or not email:
            return jsonify({"message": "Missing user_id or email"}), 400

        with pool.connect() as conn:
            # Insert into user_basic_info with display_name
            query = sqlalchemy.text(
                "INSERT INTO user_basic_info (user_id, email, display_name) VALUES (:user_id, :email, :display_name)"
            )
            conn.execute(query, {'user_id': user_id, 'email': email, 'display_name': display_name})
            
            # Insert into user_blocked_sites and user_points_hobbies
            query = sqlalchemy.text(
                "INSERT INTO user_blocked_sites (user_id, blocked_sites) VALUES (:user_id, :blocked_sites)"
            )
            conn.execute(query, {'user_id': user_id, 'blocked_sites': json.dumps(blocked_sites)})

            query = sqlalchemy.text(
                "INSERT INTO user_points_hobbies (user_id, hobbies) VALUES (:user_id, :hobbies)"
            )
            conn.execute(query, {'user_id': user_id, 'hobbies': json.dumps(hobbies)})

            conn.commit()

        return jsonify({"message": "User added successfully"}), 201

    except:
        app.logger.error(f"Error adding user")
        return jsonify({"message": "Error adding user"}), 500

    

@app.route('/get_blocked_sites', methods=['GET'])
def get_blocked_sites():
    user_id = request.args.get('user_id')
    user_id_str = str(user_id)  # Ensure user_id is a string
    with pool.connect() as conn:
        query = sqlalchemy.text(
            "SELECT blocked_sites FROM user_blocked_sites WHERE user_id = :user_id"
        )
        result = conn.execute(query, {'user_id': user_id}).fetchone()


        if result is not None:
            blocked_sites = result[0] if result[0] else []
            return jsonify({'blocked_sites': blocked_sites})
        else:
            return jsonify(user_id)#jsonify({'blocked_sites': []})


@app.route('/checkUserStatus', methods=['GET'])
def check_user_status():
    try:
        email = request.args.get('email')
        with pool.connect() as conn:
            query = sqlalchemy.text(
                "SELECT * FROM user_basic_info WHERE email = :email"
            )
            result = conn.execute(query, {'email': email}).fetchone()
            is_registered = result is not None
            return jsonify({"isRegistered": is_registered}), 200
    except Exception as e:
        app.logger.error(f"Error checking user status: {e}")
        return jsonify({"message": "Error checking user status"}), 500

@app.route('/add_blocked_site', methods=['POST'])
def add_blocked_site():
    data = request.json
    user_id = data.get('user_id')
    new_site = data.get('url')

    if not user_id:
        return jsonify("User ID not provided"), 400

    with pool.connect() as conn:
        try:
            # Fetch current blocked sites
            select_query = sqlalchemy.text(
                "SELECT blocked_sites FROM user_blocked_sites WHERE user_id = :user_id"
            )
            result = conn.execute(select_query, {'user_id': user_id}).fetchone()

            current_sites = json.loads(result[0]) if result and result[0] else []

            # Check if site already blocked
            if new_site in current_sites:
                return jsonify({"message": "Site already blocked"}), 200

            # Add new site and update database
            current_sites.append(new_site)
            update_query = sqlalchemy.text(
                "UPDATE user_blocked_sites SET blocked_sites = :blocked_sites WHERE user_id = :user_id"
            )
            conn.execute(update_query, {'blocked_sites': json.dumps(current_sites), 'user_id': user_id})
            conn.commit()

            return jsonify({"message": "Site added to blocked list"}), 201

        except Exception as e:
            print(f"Error occurred: {e}")
            return jsonify({"message": "An error occurred"}), 500



@app.route('/delete_blocked_site', methods=['DELETE'])
def delete_blocked_site():
    try:
        user_id = request.json.get('user_id')
        with pool.connect() as conn:
            # Set blocked_sites to NULL for the specified user_id
            query = sqlalchemy.text(
                "UPDATE user_blocked_sites SET blocked_sites = NULL WHERE user_id = :user_id"
            )
            conn.execute(query, {'user_id': user_id})
            conn.commit()
            return jsonify({"message": "Blocked sites cleared for the user"}), 200
    except Exception as e:
        app.logger.error(f"Error clearing blocked sites: {e}")
        return jsonify({"message": "Error clearing blocked sites"}), 500



@app.route('/add_points', methods=['POST'])
def add_points():
    data = request.json
    user_id = request.json.get('user_id')

    with pool.connect() as conn:
        update_query = sqlalchemy.text(
            "UPDATE user_points_hobbies SET points = points + 100 WHERE user_id = :user_id"
        )
        conn.execute(update_query, {'user_id': user_id})
        conn.commit()
        return jsonify({"message": "Points added"}), 200

@app.route('/subtract_points', methods=['POST'])
def subtract_points():
    data = request.json
    user_id = data['user_id']
    url = data['url']

    with pool.connect() as conn:
        # Your logic to subtract points
        update_query = sqlalchemy.text(
            "UPDATE user_points_hobbies SET points = points - 50 WHERE user_id = :user_id"
        )
        conn.execute(update_query, {'user_id': user_id})
        conn.commit()

    return jsonify({"message": "Points subtracted"}), 200

#Recommendation Page:
@app.route('/api/articles', methods=['GET'])
def get_top_headlines():
    url = 'https://newsapi.org/v2/top-headlines'
    params = {
        'country': 'us',
        'apiKey': 'f21b3cb4f9c1495084f3e6da6f87a63a'
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    articles = response.json().get('articles', [])[:10]
    return jsonify(articles)

@app.route('/api/top-books', methods=['GET'])
def get_top_books():
      # Make sure to set this environment variable
    request_url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=ejQFJNMU7cssAAa2V8KP54kjCOhd6ZAh"
    
    params = {
        "Accept": "application/json"
    }

    response = requests.get(request_url, headers=params)

    if response.status_code == 200:
        data = response.json()
        top_books = data['results'][:10]  # Assuming you want the first 10 results
        return jsonify(top_books)
    else:
        # It's a good idea to handle different HTTP status codes
        return jsonify({
            'error': 'Failed to fetch data',
            'status_code': response.status_code
        }), response.status_code
        
@app.route('/get_display_name', methods=['GET'])
def get_display_name():
    user_id = request.args.get('user_id')
    with pool.connect() as conn:
        query = sqlalchemy.text(
            "SELECT display_name FROM user_basic_info WHERE user_id = :user_id"
        )
        result = conn.execute(query, {'user_id': user_id}).fetchone()

        if result is not None and result[0] is not None:
            return jsonify(result[0])
        else:
            return jsonify({'display_name': 'No display name found'})
        

@app.route('/get_points', methods=['GET'])
def get_points():
    user_id = request.args.get('user_id')
    with pool.connect() as conn:
        query = sqlalchemy.text(
            "SELECT points FROM user_points_hobbies WHERE user_id = :user_id"
        )
        result = conn.execute(query, {'user_id': user_id}).fetchone()
        
        if result:
            # Extract points value from result
            points = result[0]
            return jsonify({"points": points})
        else:
            return jsonify({"points": 0})

#GPT endpoints

def chat_with_gpt( description=None, model="gpt-3.5-turbo"):
    try:
        messages = [
            {"role": "system", "content": "You are a helpful assistant, knowledgeable in talking about hobies and crafting schedules for productivity"},
            {"role": "user", "content": f"I am a person ready to be productive for the dat."}
        ]

        if description:
            messages.append({"role": "user", "content": f"It should be like this: {description}"})
            messages.append({"role": "system", "content": f"Based on the description, provide a specific price recommendation for the {item}."})

        response = client.chat.completions.create(model=model, messages=messages)

        if response.choices:
            choice = response.choices[0]
            if hasattr(choice, 'message') and hasattr(choice.message, 'content'):
                return choice.message.content
            else:
                return "Sorry, I couldn't process that response."
        else:
            return "No response received from the API."

    except Exception as e:
        print(f"An error occurred: {e}")
        return "Sorry, there was an error."

@app.route('/api/gpt-chat', methods=['POST'])
def gpt_chat():
    data = request.json
    item = data.get('item')
    description = data.get('description', None)
    response = chat_with_gpt(item, description)
    return jsonify({'response': response})




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
