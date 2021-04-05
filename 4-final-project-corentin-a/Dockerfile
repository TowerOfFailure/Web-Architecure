FROM node:10-alpine
WORKDIR /app
COPY package.json .
COPY server.js .
COPY images ./images
COPY admin.html .
COPY admin.js .
COPY connection.html .
COPY connection.js .
COPY quiz.html .
COPY quiz.js .
COPY result.html .
COPY result.js .
COPY adminStyle.css .
RUN npm install

# Run the server as a non-root user
# Create a user "myuser"
RUN adduser -D myuser
# Execute the code as "myuser"
USER myuser

CMD ["node", "server.js"]