// 🔴 APNA BACKEND URL YAHA DALO
const BACKEND_URL = "https://ai-video-backend.onrender.com";

const videoInput = document.getElementById("videoInput");
const statusDiv = document.getElementById("status");
const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", uploadVideo);

async function uploadVideo() {
  const file = videoInput.files[0];
  if (!file) {
    alert("Please select a video");
    return;
  }

  statusDiv.innerText = "⬆️ Uploading video...";

  const formData = new FormData();
  formData.append("video", file);

  try {
    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    checkStatus(data.renderId);

  } catch (err) {
    statusDiv.innerText = "❌ Upload failed";
  }
}

async function checkStatus(renderId) {
  statusDiv.innerText = "⚙️ Processing video...";

  const interval = setInterval(async () => {
    const res = await fetch(`${BACKEND_URL}/status/${renderId}`);
    const data = await res.json();

    if (data.status === "done") {
      clearInterval(interval);
      statusDiv.innerHTML =
        `✅ Done<br><a href="${data.url}" target="_blank">Download Video</a>`;
    }

    if (data.status === "failed") {
      clearInterval(interval);
      statusDiv.innerText = "❌ Video processing failed";
    }
  }, 4000);
}
