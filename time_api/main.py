#python3.12.7
from flask import Flask, jsonify
import ntplib
from datetime import datetime, timezone, timedelta

app = Flask(__name__)

@app.route('/time_api', methods=['GET'])
def get_ntp_time():
    try:
        client = ntplib.NTPClient()
        response = client.request('time.windows.com')
        
        ntp_time = datetime.fromtimestamp(response.tx_time, tz=timezone.utc)
        
        cst_time = ntp_time + timedelta(hours=8)
        
        cst_time_iso = cst_time.isoformat()

        return jsonify({"time_api": cst_time_iso})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
