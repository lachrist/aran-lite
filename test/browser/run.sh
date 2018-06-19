http-server -p 8000 &
SERVER_PID=$!
node ./proxy.js 8080 &
PROXY_PID=$!
/Applications/Firefox.app/Contents/MacOS/firefox-bin -private -devtools "http://localhost:8000/index.html?otiluke-request-path=%2Ffoo" &
sleep 5
kill $PROXY_PID
kill $SERVER_PID