node ./server.js 8080 &
SERVER_PID=$!
node ../../node/bin.js --analysis ../analysis.js --host 8080 --request-path /foo -- ./hello.js ! &
sleep 2
kill $SERVER_PID