from flask import Flask, request, jsonify
from flask_cors import CORS
from process import processor

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/process', methods=['POST'])
def process_request():
    data = request.json
    text = data.get("text", "")
    files = data.get("files", [])

    # Process text and files
    markdown_result, searches = processor(text, files)
    
    return jsonify({"result": markdown_result, "sources": searches})

if __name__ == '__main__':
    app.run(debug=True)
