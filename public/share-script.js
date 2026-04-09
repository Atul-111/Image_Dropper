// Get image ID from URL
const imageId = window.location.pathname.split('/share/')[1];

// Load image on page load
document.addEventListener('DOMContentLoaded', loadImage);

async function loadImage() {
  try {
    const response = await fetch(`/api/image/${imageId}`);
    
    if (!response.ok) {
      throw new Error('Image not found');
    }

    const data = await response.json();
    
    // Display image
    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('imageSection').style.display = 'block';
    
    // Set image
    const imageElement = document.getElementById('sharedImage');
    imageElement.src = data.imageUrl;
    
    // Set info
    const uploadedDate = new Date(data.uploadedAt).toLocaleString();
    const fileSize = (data.size / 1024 / 1024).toFixed(2);
    document.getElementById('imageInfo').innerHTML = `
      <strong>Filename:</strong> ${data.originalName}<br>
      <strong>File Size:</strong> ${fileSize}MB<br>
      <strong>Uploaded:</strong> ${uploadedDate}
    `;

    // Set download button
    document.getElementById('downloadBtn').onclick = () => {
      downloadImage(data.downloadUrl, data.originalName);
    };

    // Set page title
    document.title = `${data.originalName} - Image Dropper`;

  } catch (error) {
    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('errorSection').style.display = 'block';
    document.getElementById('errorSection').innerHTML = `
      <h2>❌ Error Loading Image</h2>
      <p>${error.message}</p>
      <a href="/" style="color: var(--primary-color); text-decoration: none; font-weight: 600; margin-top: 20px; display: inline-block;">
        ➕ Upload Your Own Image
      </a>
    `;
  }
}

// Download image
function downloadImage(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Copy image URL
function copyImageUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '✅ Copied!';
    button.style.background = '#10b981';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 2000);
  });
}

// Share this image
function shareThis() {
  const shareUrl = window.location.href;
  const imageInfo = document.getElementById('imageInfo').textContent;

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

  const encodedUrl = encodeURIComponent(shareUrl);
  const text = 'Check out this image on Image Dropper';
  const encodedText = encodeURIComponent(text);

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
