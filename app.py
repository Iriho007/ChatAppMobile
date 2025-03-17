from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    profile = {
        'name': 'Benjamin Iriho',
        'title': 'Software Developer',
        'skills': ['Python', 'HTML', 'CSS', 'JavaScript', 'Flask'],
        'experience': [
            {
                'position': 'Senior Developer',
                'company': 'Tech Company',
                'period': '2020-Present'
            },
            {
                'position': 'Web Developer',
                'company': 'StartUp Inc',
                'period': '2018-2020'
            }
        ],
        'education': 'Bachelor in Computer Science',
        'contact': {
            'email': 'your.email@example.com',
            'linkedin': 'linkedin.com/in/yourprofile',
            'github': 'github.com/yourprofile'
        }
    }
    return render_template('index.html', profile=profile)

if __name__ == '__main__':
    app.run(debug=True)