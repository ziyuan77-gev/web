from flask import Flask, jsonify
import ntplib
from datetime import datetime

app = Flask(__name__)

@app.route('/time_api', methods=['GET'])
def get_ntp_time():
    try:
        client = ntplib.NTPClient()
        response = client.request('pool.ntp.org')
        current_time = datetime.now().isoformat()
        return jsonify({"time_api": current_time})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
