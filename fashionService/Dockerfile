# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file into the container
COPY target/fashionService-*.jar app.jar

# Expose the port the app runs on
EXPOSE 8077

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
