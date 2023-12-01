from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database configuration
app.config['DB_HOST'] = 'localhost'
app.config['DB_USER'] = 'root'
app.config['DB_NAME'] = 'team'

# Function to get database connection
def get_db_connection():
    conn = mysql.connector.connect(
        host=app.config['DB_HOST'],
        user=app.config['DB_USER'],
        database=app.config['DB_NAME']
    )
    return conn


@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    display_name = data.get('displayName')
    date_of_birth = data.get('dateOfBirth')
    hobbies = data.get('hobbies')

    # Call a function to insert data into the database
    success = insert_user_into_database(display_name, date_of_birth, hobbies)

    if success:
        return jsonify({'success': True, 'message': 'User registered successfully'})
    else:
        return jsonify({'success': False, 'message': 'Registration failed'}), 400

def insert_user_into_database(display_name, date_of_birth, hobbies):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (display_name, DateofBirth, hobbies) VALUES (%s, %s, %s)", 
                       (display_name, date_of_birth, hobbies))
        conn.commit()
        return True
    except Exception as e:
        print(f"Database insertion failed: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

@app.route('/api/check-user', methods=['POST'])
def check_user():
    user_id = request.json.get('userId')
    user_exists, user_data = check_user_in_database(user_id)

    if user_exists:
        return jsonify({'exists': True, 'userData': user_data})
    else:
        return jsonify({'exists': False})

def check_user_in_database(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use dictionary cursor to get data as dictionaries

    try:
        # Replace 'users' with your actual table name and appropriate column names
        cursor.execute("SELECT * FROM users WHERE user_token = %s", (user_id,))
        user_data = cursor.fetchone()
        return (user_data is not None, user_data)
    except Exception as e:
        print(f"Database query failed: {e}")
        return False, None
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
