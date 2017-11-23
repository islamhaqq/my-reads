# escape=`

# use an image that comes with yarn and node pre-installed
FROM kkarczmarczyk/node-yarn

# use the whole directory
ADD . .

# download dependencies and run the dev server when the container is executed
ENTRYPOINT yarn && yarn run start
# server listens on port 3000
EXPOSE 3000
