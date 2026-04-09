// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadProgress = document.getElementById('uploadProgress');
const resultSection = document.getElementById('resultSection');
const errorMessage = document.getElementById('errorMessage');

// Event listeners for drag and drop
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('dragleave', handleDragLeave);
dropZone.addEventListener('drop', handleDrop);

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    uploadImage(e.target.files[0]);
  }
});

// Drag and drop handlers
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('dragover');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      uploadImage(file);
    } else {
      showError('Please drop an image file');
    }
  }
}

// Upload image
async function uploadImage(file) {
  // Validate file size
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    showError('File size exceeds 50MB limit');
    return;
  }

  // Create form data
  const formData = new FormData();
  formData.append('image', file);

  // Show progress
  uploadProgress.style.display = 'block';
  resultSection.style.display = 'none';
  errorMessage.style.display = 'none';

  try {
    // Create XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        document.getElementById('progressFill').style.width = percentComplete + '%';
        document.getElementById('progressText').textContent = `Uploading... ${Math.round(percentComplete)}%`;
      }
    });

    // Handle completion
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        displayResult(response, file.name);
      } else {
        const response = JSON.parse(xhr.responseText);
        showError(response.error || 'Upload failed');
      }
      uploadProgress.style.display = 'none';
    });

    // Handle error
    xhr.addEventListener('error', () => {
      showError('Upload failed. Please try again.');
      uploadProgress.style.display = 'none';
    });

    // Send request
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  } catch (error) {
    showError('An error occurred during upload: ' + error.message);
    uploadProgress.style.display = 'none';
  }
}

// Display result
function displayResult(data, fileName) {
  document.getElementById('resultImage').src = `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(data.imageUrl.split(',')[1])))}` || `/download/${data.uniqueId}`;
  
  // Load actual image
  const img = new Image();
  img.src = `/download/${data.uniqueId}`;
  img.onload = () => {
    document.getElementById('resultImage').src = img.src;
  };

  document.getElementById('fileName').textContent = 'Filename: ' + fileName;
  document.getElementById('shareUrl').value = data.shareUrl;
  document.getElementById('downloadUrl').value = data.downloadUrl;

  resultSection.style.display = 'block';
  dropZone.style.display = 'none';
}

// Copy to clipboard
function copyToClipboard(elementId) {
  const element = document.getElementById(elementId);
  element.select();
  document.execCommand('copy');

  const button = event.target;
  const originalText = button.textContent;
  button.textContent = '✅ Copied!';
  button.style.background = '#10b981';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
  }, 2000);
}

// Share on social media
function shareOnSocial() {
  const shareUrl = document.getElementById('shareUrl').value;
  const fileName = document.getElementById('fileName').textContent;

  const text = `Check out this image on Image Dropper: ${fileName}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);

  // Show share options
  const shareMenu = document.createElement('div');
  shareMenu.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    min-width: 300px;
  `;

  shareMenu.innerHTML = `
    <h2 style="margin-bottom: 20px;">Share Image</h2>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <a href="https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}" target="_blank" style="padding: 10px; background: #1DA1F2; color: white; border-radius: 6px; text-align: center; text-decoration: none;">Twitter</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" style="padding: 10px; background: #4267B2; color: white; border-radius: 6px; text-align: center; text-decoration: none;">Facebook</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" style="padding: 10px; background: #0077b5; color: white; border-radius: 6px; text-align: center; text-decoration: none;">LinkedIn</a>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 10px; background: var(--surface-light); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">Close</button>
    </div>
  `;

  document.body.appendChild(shareMenu);

  // Add overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `;
  overlay.onclick = () => {
    overlay.remove();
    shareMenu.remove();
  };
  document.body.appendChild(overlay);
}

// Reset upload
function resetUpload() {
  resultSection.style.display = 'none';
  dropZone.style.display = 'block';
  uploadProgress.style.display = 'none';
  errorMessage.style.display = 'none';
  fileInput.value = '';
  document.getElementById('progressFill').style.width = '0%';
}

// Show error message
function showError(message) {
  errorMessage.textContent = '❌ Error: ' + message;
  errorMessage.style.display = 'block';
  uploadProgress.style.display = 'none';
  resultSection.style.display = 'none';
}
