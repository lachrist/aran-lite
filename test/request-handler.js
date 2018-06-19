module.exports = (request, response) => {
  console.log(request.method+" "+request.url);
  let body = "";
  request.on("data", (data) => { body+=data });
  request.on("end", () => {
    console.log(body);
    response.end();
  });
};