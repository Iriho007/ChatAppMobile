from flask import Flask, render_template

app = Flask(__name__, 
    template_folder='.',
    static_folder='static'
)

@app.route('/')
def home():
    profile = {
        'greeting': "Hi! I'm",
        'name': 'Benjamin',
        'highlight': 'Iriho',
        'title': "I'm a Data Analyst and Database Administrator based in Kigali, Rwanda.",
        'contact': {
            'email': 'irihobenjamin5050@gmail.com',
            'phone': '+250-787-724-702',
            'text': "Let's work together"
        },
        'social': {
            'linkedin': 'linkedin.com/in/benjaminiriho',
            'github': 'github.com/benjaminiriho',
            'twitter': 'twitter.com/benjaminiriho'
        }
    }
    return render_template('index.html', profile=profile)

@app.route('/about')
def about():
    about_data = {
        'title': 'About Me',
        'description': 'Experienced Data Analyst and Database Administrator with expertise in data visualization and database management.',
        'skills': [
            'Oracle Database',
            'SQL Server',
            'MySQL',
            'Python',
            'Data Analysis',
            'ETL Processes',
            'Database Security',
            'Performance Tuning'
        ],
        'experience': [
            {
                'role': 'Data Analyst',
                'company': 'Guaranty Trust Bank Rwanda Plc',
                'period': '2023 - Present',
                'details': 'Leading data analysis and database management initiatives.'
            },
            {
                'role': 'Database Administrator',
                'company': 'T-NET Rwanda',
                'period': '2022 - 2023',
                'details': 'Managed database operations and security protocols.'
            }
        ]
    }
    return render_template('about.html', about=about_data)

if __name__ == '__main__':
    app.run(debug=True)