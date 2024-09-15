# Contacts Application
## Project Overview
This is a full-stack Contacts application consisting of:
- A **backend API** built with Spring Boot, providing CRUD operations for contacts management.
- A **frontend** built with HTML, CSS, and JavaScript, providing a user interface to interact with the backend.
- A **MySQL database** for persistent data storage, managed through Docker Compose.
Docker Compose is used to manage backend, frontend and database services.

## Prerequisites
Before you start, ensure you have the following installed:

- Docker
- Docker Compose

## Project Structure
```bash
|--- contacts-backend/          # Backend API (Spring Boot + H2)
|--- contacts-frontend/         # Frontend (HTML, CSS, JavaScript)
|--- docker-compose.yml         # Docker Compose file
```

## Running the Application
Follow these steps to build and run the application.

### Step 1: Clone the repository
```bash
git clone https://github.com/BhardwajNkl/contacts-fullstack.git
cd contacts-fullstack
```

### Step 2: Run the Application with Docker Compose
Use the following command:
```bash
docker-compose up
```
This command will:
- Build and start **backend**, **frontend** and **MySQL Database** services.
- The **backend** will be available at http://localhost:9090.
- The **frontend** will be available at http://localhost:3000.

### Step 3: Access the Application
Open a browser and go to http://localhost:3000 . This will load the Contacts application user interface.
To get API documentation: Visit http://localhost:9090/swagger-ui/index.html .

### Step 4: Stopping the Application
**NOTE:** The below command will stop and remove the containers but not remove the volume. This means you can again launch the app and get the previously stored data. If you want to remove the associated docker volume too, then just add: **--volume** in the end of the below comand.
```bash
docker-compose down
```

### Step 5: Clean Up
**Remove the images:** Use the below command to see the docker images.
```bash
docker images
```

Identify the image that you want to remove. And then use the below command.
```bash
docker rmi <Image name>
```
