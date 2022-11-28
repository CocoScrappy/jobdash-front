import "//mozilla.github.io/pdf.js/build/pdf.js";

function PdfTest() {
  var url =
    "https://nehmea.github.io/portfolio-fsd/assets/resume/AliNehme_Resume_FSD.pdf";
  var pdfjsLib = window["pdfjs-dist/build/pdf"];
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "//mozilla.github.io/pdf.js/build/pdf.worker.js";
  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        console.log("Page loaded");

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById("the-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    },
    function (reason) {
      // PDF loading error
      console.error(reason);
    }
  );
  return (
    <div>
      <h1>PDF.js 'Hello, world!' example</h1>

      <canvas id="the-canvas"></canvas>
    </div>
  );
}

export default PdfTest;
