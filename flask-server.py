from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from google.cloud.sql.connector import Connector
import mysql.connector
import sqlalchemy

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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


@app.route('/add_basic_user', methods=['POST'])
def add_basic_user():
    try:
        user_data = request.json
        user_id = user_data.get('user_id')  # Changed from auth0_id to user_id
        email = user_data.get('email')

        if not user_id or not email:
            return jsonify({"message": "Missing user_id or email"}), 400

        with pool.connect() as conn:
            query = sqlalchemy.text(
                "INSERT INTO user_basic_info (user_id, email) VALUES (:user_id, :email)"
            )
            conn.execute(query, {'user_id': user_id, 'email': email})  # Updated the keys to match the placeholders
            conn.commit()
        return jsonify({"message": "User added successfully"}), 201
    except Exception as e:
        app.logger.error(f"Error adding user: {e}")
        return jsonify({"message": "Error adding user"}), 500








if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
