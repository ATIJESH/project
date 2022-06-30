const mediaSelector = document.getElementById("media");

const webCamContainer =
	document.getElementById("web-cam-container");

let selectedMedia = "video";

let chunks = [];

const videoMediaConstraints = {

	audio: true,
	video: true,
};


function startRecording(
	thisButton, otherButton) {

	
	navigator.mediaDevices.getUserMedia(
		selectedMedia =videoMediaConstraints)
		.then((mediaStream) => {

	
		const mediaRecorder =
			new MediaRecorder(mediaStream);

	
		window.mediaStream = mediaStream;
	
		window.mediaRecorder = mediaRecorder;

		mediaRecorder.start();

	
		mediaRecorder.ondataavailable = (e) => {

		
			chunks.push(e.data);
		};

	
		mediaRecorder.onstop = () => {

		
			const blob = new Blob(
				chunks, {
					type: selectedMedia ="video/mp4"
				});
			chunks = [];

			
			const recordedMedia = document.createElement(
				selectedMedia = "video");
			recordedMedia.controls = true;

		
			const recordedMediaURL = URL.createObjectURL(blob);

		
			recordedMedia.src = recordedMediaURL;

		
			const downloadButton = document.createElement("a");

			downloadButton.download = "Recorded-Media";

			downloadButton.href = recordedMediaURL;
			downloadButton.innerText = "Download it!";

			downloadButton.onclick = () => {


				URL.revokeObjectURL(recordedMedia);
			};

			document.getElementById(
				`vid-recorder`).append(
				recordedMedia, downloadButton);
		};

		
			webCamContainer.srcObject = mediaStream;
		
		document.getElementById(
				`vid-record-status`)
				.innerText = "";

		thisButton.disabled = true;
		otherButton.disabled = false;
	});
}

function stopRecording(thisButton, otherButton) {

	document.getElementById('stop-vid-recording').disabled = true;
	
	document.getElementById('start-vid-recording').disabled = false;
	window.mediaRecorder.stop();


	window.mediaStream.getTracks()
	.forEach((track) => {
		track.stop();
		
	});

	
	
}
