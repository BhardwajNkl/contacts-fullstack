FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/contacts-backend-0.0.1-SNAPSHOT.jar /app/contacts-app-backend.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "contacts-app-backend.jar"]
