cd ~/APIServer/APIServer
fuser -k 3000/tcp
npm install
pm2 start app.js