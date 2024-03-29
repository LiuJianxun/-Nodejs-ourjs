// var exec = require("child_process").exec;
var querystring = require("querystring");
    fs          = require("fs");
    formidable  = require("formidable");
// function start(response){
//   console.log("Request handler 'start' was called.");

//   exec(" find /Library/ -type f -name 'requestHandlers.js' ",
//     { timeout:10000, maxBuffer:20000*1024},
//     function(error, stdout, stderr){
//       response.writeHead(200,{"Content-Type":"text/plain"});
//       response.write(stdout);
//       response.end();
//   });
// }

function start(response, request){
  console.log("Request handler 'start' was called.");

  var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
  // console.log("Request handler 'upload' was called.");
  // response.writeHead(200,{"Content-Type":"text/plain"});
  // response.write("You've sent: "+ querystring.parse(postData).text);
  // response.end();
  console.log("Request handler 'upload' was called.");

  var form =new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request,function(error, fields, files){
    console.log("parsing done");
    fs.renameSync(files.upload.path,"/tmp/test.jpg");
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response, request){
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.jpg","binary",function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error +"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/jpg"});
      response.write(file,"binary");
      response.end();
    }
  });
}

exports.start  = start;
exports.upload = upload;
exports.show   = show;