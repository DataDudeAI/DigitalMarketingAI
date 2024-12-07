from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_ai_response(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return str(e)

@app.route('/research_audience', methods=['POST'])
def research_audience():
    data = request.json
    product = data.get('product')
    prompt = f"Analyze the target audience for {product}. Include demographics, interests, and behaviors."
    response = generate_ai_response(prompt)
    return jsonify({"status": "success", "message": response})

@app.route('/create_content', methods=['POST'])
def create_content():
    data = request.json
    product = data.get('product')
    prompt = f"Create engaging marketing content for {product}. Include key features, benefits, and call to action."
    response = generate_ai_response(prompt)
    return jsonify({"status": "success", "message": response})

@app.route('/analyze_market', methods=['POST'])
def analyze_market():
    data = request.json
    product = data.get('product')
    prompt = f"Provide market analysis for {product}. Include trends, competitors, and opportunities."
    response = generate_ai_response(prompt)
    return jsonify({"status": "success", "message": response})

@app.route('/email_campaign', methods=['POST'])
def email_campaign():
    data = request.json
    product = data.get('product')
    prompt = f"Generate an email marketing campaign template for {product}. Include subject line and body content."
    response = generate_ai_response(prompt)
    return jsonify({"status": "success", "message": response})

if __name__ == '__main__':
    app.run(debug=True)