# escape=`

# use an image that comes with yarn and node pre-installed
FROM kkarczmarczyk/node-yarn

# use the whole directory
ADD . .

# download dependencies
RUN yarn
# server listens on port 3000
EXPOSE 3000
