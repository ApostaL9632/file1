const main = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Файлообменник</h1>
  <form id="uploadForm" enctype="multipart/form-data">
    <input type="file" name="file" required>
    <button type="submit">Загрузить</button>
  </form>
  <div id="message"></div>
  <a href="/uploads/" download>
    <button>Скачать файл</button>
  </a>

  <script>
    const form = document.getElementById('uploadForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      fetch('/uploads', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => showMessage(data.message))
        .catch(error => console.error(error));
    });

    function showMessage(message) {
      messageDiv.textContent = message;
    }
  </script>
</body>
</html>
`
module.exports = main;