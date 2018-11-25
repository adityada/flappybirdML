# flappybirdML
This project uses Machine Learning in Flappy Bird.
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software:

```
Python 3+
pip
virtualenv
```

### Installing

A step by step series of examples that tell you how to get a development env running

Initialize a git repository on a remote folder and pull from this link
```
> git init
> git remote add origin https://github.com/adityada/flappybirdML
```
Initialize a virtual environment in the folder
```
> virtualenv venv
```
Open your virtual environment. On Windows:
```
> venv\Scripts\activate
```
On Mac:
```
> . venv/bin/activate
```
Install the following prerequisites using pip:
```
> pip install flask
> pip install flask-sqlalchemy
> pip install flask_marshmallow
> pip install flask_cors
```

Create your database by
```
> python
python3 > from datam import db
python3 > db.create_all()
```
## Authors

* **Aditya Dananjaya** 

## Acknowledgments

* Inspired by Daniel Shiffman from The Coding Train
