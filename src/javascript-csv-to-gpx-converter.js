(function(){
	var container = document.getElementById('container');

	var inputTitle = document.createElement('h2');
	var outputTitle = document.createElement('h2');

	inputTitle.innerHTML = "CSV";
	outputTitle.innerHTML = "GPX";

	var inputBoxPanel = document.createElement('div');
	inputBoxPanel.className = 'panel panel-info';

	var inputBoxPanelHeading = document.createElement('div');
	inputBoxPanelHeading.className = 'panel-heading';

	var inputBoxPanelBody = document.createElement('div');
	inputBoxPanelBody.className = 'panel-body';

	var inputTextArea = document.createElement('textarea');
	inputTextArea.className = 'input-content form-control';

	var inputDescription = document.createElement('p');
	inputDescription.innerHTML = 'Example: Point Number,Latitude,Longitude';

	var inputBoxPanelFooter = document.createElement('div');
	inputBoxPanelFooter.className = 'panel-footer';
	inputBoxPanelFooter.appendChild(inputDescription);

	inputBoxPanelHeading.appendChild(inputTitle);
	inputBoxPanelBody.appendChild(inputTextArea);

	inputBoxPanel.appendChild(inputBoxPanelHeading);
	inputBoxPanel.appendChild(inputBoxPanelBody);
	inputBoxPanel.appendChild(inputBoxPanelFooter);

	var outputBoxPanel = document.createElement('div');
	outputBoxPanel.className = 'panel panel-success';

	var outputBoxPanelHeading = document.createElement('div');
	outputBoxPanelHeading.className = 'panel-heading';

	var outputBoxPanelBody = document.createElement('div');
	outputBoxPanelBody.className = 'panel-body';

	var outputTextArea = document.createElement('textarea');
	outputTextArea.className = 'output-content form-control';
	outputTextArea.setAttribute('readonly', true);

	outputBoxPanelHeading.appendChild(outputTitle);
	outputBoxPanelBody.appendChild(outputTextArea);

	outputBoxPanel.appendChild(outputBoxPanelHeading);
	outputBoxPanel.appendChild(outputBoxPanelBody);

	var button = document.createElement('button');
	button.className = 'btn btn-primary';
	button.innerHTML = 'Convert';
	button.addEventListener('click', readInput, false)

	function readInput() {
		var inputElement = container.querySelector('.input-content');
		var inputContent = inputElement.value;

		var inputData = inputContent.split("\n");

		convert(inputData);
	}

	function convert(data){
		if(data == ''){
			return;
		}

	//	var d = new Date();
	//	var n = d.toISOString();

		outputTextArea.innerHTML = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\r\n';
		outputTextArea.innerHTML += '<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="JavaScript CSV To GPX Converter" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensions/v3/GpxExtensionsv3.xsd http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">\r\n';
		outputTextArea.innerHTML += '<metadata>\r\n';
		outputTextArea.innerHTML += ' <link href="http://www.garmin.com">\r\n';
		outputTextArea.innerHTML += '  <text>Garmin International</text>\r\n';
		outputTextArea.innerHTML += ' </link>\r\n';
		outputTextArea.innerHTML += ' <bounds maxlat="0" maxlon="0" minlat="0" minlon="0" />\r\n';
		outputTextArea.innerHTML += '</metadata>\r\n';
		outputTextArea.innerHTML += '<trk>\r\n';
		outputTextArea.innerHTML += '<name>Track MiniGPS+</name>\r\n';
		outputTextArea.innerHTML += '  <trkseg>\r\n';

		var output = '';

		for(var i = 0; i < data.length; i++){
			var line = data[i].trim().replace(/\s\s+/g, ' ').split(", ");
			var t = Date.parse(line[0] + 'Z');
			var n = new Date(t).toISOString();

			output += '   <trkpt lat="' + line[1] + '" lon="' + line[2] + '">\r\n';
			output += '    <ele>' + line[3] + '</ele>\r\n';
			output += '    <time>' + n + '</time>\r\n';
			output += '   </trkpt>\r\n';
		}

		outputTextArea.innerHTML += output;
		outputTextArea.innerHTML += ' </trkseg>\r\n';
		outputTextArea.innerHTML += '</trk>\r\n';
		outputTextArea.innerHTML += '</gpx>\r\n';
	}

	container.appendChild(inputBoxPanel);
	container.appendChild(outputBoxPanel);
	container.appendChild(button);
}());
