from flask import Flask, jsonify
import time
import threading
import os

app = Flask(__name__)

CPU_LOAD = 0

def cpu_stress():
    global CPU_LOAD
    while True:
        if CPU_LOAD > 0:
            end = time.time() + CPU_LOAD
            while time.time() < end:
                pass
        time.sleep(1)

threading.Thread(target=cpu_stress, daemon=True).start()

@app.route("/")
def home():
    return jsonify({
        "service": "Container Resource Manager",
        "pod": os.getenv("HOSTNAME", "unknown")
    })

@app.route("/load/<int:level>")
def load(level):
    global CPU_LOAD
    CPU_LOAD = min(level, 5)
    return jsonify({
        "status": "CPU load updated",
        "load_level": CPU_LOAD
    })

@app.route("/metrics")
def metrics():
    return jsonify({
        "cpu_load_level": CPU_LOAD,
        "pod": os.getenv("HOSTNAME", "unknown")
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
