# using nginx image with Alpine Linux as the base image
FROM nginx:alpine

# Copying web files from host's current directory to the container's directory.
# nginx serves from /usr/share/nginx/html directory. So, let's copy to that directory.
COPY ./ /usr/share/nginx/html

#nginx will serve the app on port 80. So, let's expose port 80.
EXPOSE 80
