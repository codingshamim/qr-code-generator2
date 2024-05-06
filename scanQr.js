document.addEventListener("DOMContentLoaded", function () {
  const scanButton = document.getElementById("scanButton");

  scanButton.addEventListener("click", function () {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // or "user" for front camera
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
          ],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          console.error("Error initializing Quagga:", err);
          return;
        }
        console.log("Initialization finished. Starting Quagga...");
        Quagga.start();
      }
    );

    Quagga.onDetected(function (result) {
      console.log("Scanning result:", result.codeResult.code);
      // You can do further processing with the scanning result here
    });
  });
});
