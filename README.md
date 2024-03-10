# muscle-minder

A fitness tracking web app designed to ensure you hit all important muscle groups

## DB Setup Instructions
- Create .env file from .env.example
- Run `docker compose up` to pull in the images and run the db + pgadmin
- pgAdmin instance on http://localhost:5050 and postgres db on http://localhost:5432

## Backend Setup Instructions
- Navigate backend folder and create a venv there and run `pip install -r requirements.txt` to pull the proper dependecies
- In another terminal window, navigate to backend/app and run python main.app to launch the API on http://localhost:8000
- Navigate to http://localhost:8000/docs to view API documentation


