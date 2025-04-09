document.addEventListener('DOMContentLoaded', function() {
    console.log("Checking mockup files...");

    // DOM Elements
    const imageUpload = document.getElementById('image-upload');
    const userDesign = document.getElementById('user-design');
    const phoneCaseBg = document.getElementById('phone-case-bg');
    const phoneCaseOverlay = document.getElementById('phone-case-overlay');
    const downloadBtn = document.getElementById('download-btn');
    const designControls = document.getElementById('design-controls');
    const designArea = document.getElementById('design-area');

    // Error handling for images
    phoneCaseBg.onerror = () => console.error("Background image failed to load!");
    phoneCaseOverlay.onerror = () => console.error("Overlay image failed to load!");

    // Design adjustment variables
    let scale = 1;
    let posX = 0;
    let posY = 0;
    let rotation = 0;

    // Initialize phone case dimensions
    phoneCaseBg.onload = function() {
        // Set container size to match phone case
        const container = document.getElementById('mockup-container');
        container.style.width = `${this.naturalWidth}px`;
        container.style.height = `${this.naturalHeight}px`;

        // Set design area to match case opening (adjust these values)
        designArea.style.width = `${this.naturalWidth * 0.8}px`;
        designArea.style.height = `${this.naturalHeight * 0.8}px`;
        designArea.style.left = `${this.naturalWidth * 0.1}px`;
        designArea.style.top = `${this.naturalHeight * 0.1}px`;
    };

    // Handle image upload
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                userDesign.src = event.target.result;
                userDesign.style.display = 'block';
                updateDesignPosition();

                // Show design controls
                designControls.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Design adjustment controls
    document.getElementById('scale-up').addEventListener('click', () => {
        scale += 0.1;
        updateDesignPosition();
    });

    document.getElementById('scale-down').addEventListener('click', () => {
        scale = Math.max(0.1, scale - 0.1);
        updateDesignPosition();
    });

    document.getElementById('move-left').addEventListener('click', () => {
        posX -= 10;
        updateDesignPosition();
    });

    document.getElementById('move-right').addEventListener('click', () => {
        posX += 10;
        updateDesignPosition();
    });

    document.getElementById('move-up').addEventListener('click', () => {
        posY -= 10;
        updateDesignPosition();
    });

    document.getElementById('move-down').addEventListener('click', () => {
        posY += 10;
        updateDesignPosition();
    });

    document.getElementById('rotate-left').addEventListener('click', () => {
        rotation -= 5;
        updateDesignPosition();
    });

    document.getElementById('rotate-right').addEventListener('click', () => {
        rotation += 5;
        updateDesignPosition();
    });

    // Update design position and transformations
    function updateDesignPosition() {
        userDesign.style.transform = `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`;
    }

    // Download mockup
    downloadBtn.addEventListener('click', function() {
        if (!userDesign.src) {
            alert('Please upload an image first!');
            return;
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to match phone case
        canvas.width = phoneCaseBg.naturalWidth;
        canvas.height = phoneCaseBg.naturalHeight;

        // Draw phone case background
        ctx.drawImage(phoneCaseBg, 0, 0, canvas.width, canvas.height);

        // Draw user design with transformations
        ctx.save();
        ctx.translate(
            parseFloat(designArea.style.left) + (designArea.offsetWidth / 2) + posX,
            parseFloat(designArea.style.top) + (designArea.offsetHeight / 2) + posY
        );
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(scale, scale);

        // Calculate dimensions to fill design area
        const drawWidth = designArea.offsetWidth / scale;
        const drawHeight = designArea.offsetHeight / scale;

        ctx.drawImage(
            userDesign,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
        );
        ctx.restore();

        // Draw phone case overlay
        ctx.drawImage(phoneCaseOverlay, 0, 0, canvas.width, canvas.height);

        // Create download link
        const link = document.createElement('a');
        link.download = 'custom-phone-case.png';
        link.href = canvas.toDataURL('image/png');

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

