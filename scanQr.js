document.addEventListener("DOMContentLoaded", function () {
    const scanButton = document.getElementById("scanButton");
    const scannerContainer = document.getElementById("scannerContainer");

    scanButton.addEventListener("click", function () {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    const video = document.createElement("video");
                    video.srcObject = stream;
                    scannerContainer.appendChild(video);
                    video.play();

                    const barcodeDetector = new BarcodeDetector();
                    barcodeDetector.detect(video)
                        .then(barcodes => {
                            if (barcodes && barcodes.length > 0) {
                                console.log("Scanning result:", barcodes[0].rawValue);
                                // You can do further processing with the scanning result here
                            } else {
                                console.log("No barcode detected");
                            }
                        })
                        .catch(error => {
                            console.error("Barcode detection error:", error);
                        });
                })
                .catch(function (error) {
                    console.error("Error accessing camera:", error);
                });
        } else {
            console.error("getUserMedia not supported on your browser");
        }
    });
});
