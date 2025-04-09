document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const imageUpload = document.getElementById('image-upload');
    const userDesign = document.getElementById('user-design');
    const phoneCase = document.getElementById('phone-case');
    const downloadBtn = document.getElementById('download-btn');
    const previewContainer = document.getElementById('mockup-container');
    const designControls = document.getElementById('design-controls');
    
    // Design adjustment variables
    let scale = 1;
    let posX = 50;
    let posY = 100;
    let rotation = 0;
    
    // Initialize the phone case image
    phoneCase.onload = function() {
        // Set canvas size to match phone case dimensions
        previewContainer.style.width = `${this.width}px`;
        previewContainer.style.height = `${this.height}px`;
    };
    
    // Handle image upload
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                userDesign.src = event.target.result;
                userDesign.style.display = 'block';
                userDesign.style.transform = `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`;
                
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
        canvas.width = phoneCase.naturalWidth;
        canvas.height = phoneCase.naturalHeight;
        
        // Draw user design (with all transformations)
        ctx.save();
        ctx.translate(posX + (userDesign.width * scale / 2), posY + (userDesign.height * scale / 2));
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(scale, scale);
        ctx.drawImage(userDesign, -userDesign.width/2, -userDesign.height/2);
        ctx.restore();
        
        // Draw phone case on top
        ctx.drawImage(phoneCase, 0, 0, canvas.width, canvas.height);
        
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
