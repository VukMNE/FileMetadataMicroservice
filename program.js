var express = require("express");
var cors = require("cors");
var multer = require("multer");
var upload = multer({dest: "uploads/"});
var app = express();
app.use(cors());
app.use(express.static('./public'));

app.post("/filesize", upload.single('file'), function( request, response){
	if(request.hasOwnProperty("file")){
		response.send(getFileSize(request.file.size));
	}
	else{
		noFile = { fileSize: "0 bytes"};
		response.send(noFile);
	}
});

app.listen(process.env.PORT || 5000);

function getFileSize(bytes){
	var obj = {};
	if(bytes > 1024){
		if(bytes > 1024*1024){
			if( bytes > 1024*1024*1024){
				//it's in Gigabytes
				var gbs = Math.round(((bytes / 1024)/1024)/1024 * 100) / 100;
				obj.fileSize = mbs + " GBs";
			}
			else{
				//it's in Megabytes
				var mbs = Math.round((bytes / 1024)/1024 * 100) / 100;
				obj.fileSize = mbs + " MBs";
			}
		}
		else{
			//it's in Kilobytes
			var kbs =  Math.round(bytes / 1024 * 100) / 100;
			obj.fileSize = kbs + " KBs";
		}
	}
	else{
		obj.fileSize = bytes + " bytes";
	}
	
	return obj;
}