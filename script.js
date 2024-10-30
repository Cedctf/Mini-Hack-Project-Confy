// Function to add video to DOM
function addVideoToDOM(videoData) {
    const videoContainer = document.getElementById('video-container');

    const product = document.createElement('div');
    product.className = 'product';

    const videoElement = document.createElement('video');
    videoElement.src = videoData.url;
    videoElement.controls = true;
    videoElement.width = 320;
    videoElement.height = 180;

    const description = document.createElement('div');
    description.className = 'description';

    const creator = document.createElement('span');
    creator.textContent = `Creator: ${videoData.creator}`;

    const title = document.createElement('h5');
    title.textContent = videoData.title;

    const starDiv = document.createElement('div');
    starDiv.className = 'star';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = 'fas fa-star';
        starDiv.appendChild(star);
    }

    const views = document.createElement('h4');
    views.textContent = 'Views: 0';

    description.appendChild(creator);
    description.appendChild(title);
    description.appendChild(starDiv);
    description.appendChild(views);

    product.appendChild(videoElement);
    product.appendChild(description);

    videoContainer.appendChild(product);
}

// Function to save video data to localStorage
function saveVideoData(videoData) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push(videoData);
    localStorage.setItem('videos', JSON.stringify(videos));
}

// Function to load videos from localStorage
function loadVideosFromLocalStorage() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.forEach(videoData => addVideoToDOM(videoData));
}

// Event listener for uploading a video
document.getElementById('uploadButton')?.addEventListener('click', function () {
    const videoInput = document.getElementById('videoUpload');
    const creatorInput = document.getElementById('creatorName');
    const titleInput = document.getElementById('videoTitle');

    if (videoInput.files && videoInput.files[0] && creatorInput.value && titleInput.value) {
        const videoFile = videoInput.files[0];
        const videoURL = URL.createObjectURL(videoFile);
        const creatorName = creatorInput.value;
        const videoTitle = titleInput.value;

        const videoData = {
            url: videoURL,
            creator: creatorName,
            title: videoTitle
        };

        // Save to localStorage
        saveVideoData(videoData);

        // Add video to the DOM immediately
        addVideoToDOM(videoData);

        // Reset inputs
        videoInput.value = '';
        creatorInput.value = '';
        titleInput.value = '';
        
        alert('Video uploaded successfully!');
    } else {
        alert("Please complete all fields and select a video file to upload.");
    }
});


// Only load videos if we are on video.html
if (window.location.pathname.endsWith("video.html")) {
    document.addEventListener('DOMContentLoaded', loadVideosFromLocalStorage);
}

// document.querySelector('.wallet').addEventListener('click', async () => {
//     if (typeof window.ethereum !== 'undefined') {
//         try {
//             // Request connection to MetaMask
//             const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();

//             // Get wallet details
//             const walletAddress = accounts[0];
//             const balance = await provider.getBalance(walletAddress);
//             const balanceInEther = ethers.utils.formatEther(balance);

//             // Display wallet details in the console (or on the page if needed)
//             console.log("Wallet Address:", walletAddress);
//             console.log("Wallet Balance:", balanceInEther);

//             alert("Wallet connected successfully!\nAddress: " + walletAddress + "\nBalance: " + balanceInEther + " ETH");
//         } catch (error) {
//             console.error("Error connecting wallet:", error);
            
//             // Handle specific MetaMask errors
//             if (error.code === 4001) {
//                 alert("Connection request denied. Please authorize the connection in MetaMask.");
//             } else {
//                 alert("Failed to connect wallet. Please try again or check the console for more details.");
//             }
//         }
//     } else {
//         alert("MetaMask is not installed. Please install MetaMask to connect your wallet.");
//     }
// });




localStorage.removeItem('videos');
localStorage.clear();
