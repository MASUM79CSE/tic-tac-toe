from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# 404 Error Handler
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# 500 Error Handler
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500
