        // Download Function
        function downloadMockup() {
            if (!elements.design.src) {
                alert('Please upload an image first!');
                return;
            }
            
            // Create canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas to mockup dimensions (2000x2000 pixels)
            canvas.width = 2000;
            canvas.height = 2000;
            
            // Draw phone case background
            ctx.drawImage(elements.caseBg, 0, 0, canvas.width, canvas.height);
            
            // Draw user design with transformations
            ctx.save();
            
            // Calculate center point of design area
            const centerX = elements.designArea.offsetLeft + (elements.designArea.offsetWidth / 2);
            const centerY = elements.designArea.offsetTop + (elements.designArea.offsetHeight / 2);
            
            // Apply transformations
            ctx.translate(centerX + designState.posX, centerY + designState.posY);
            ctx.rotate(designState.rotation * Math.PI / 180);
            ctx.scale(designState.scale, designState.scale);
            
            // Draw the user design
            ctx.drawImage(
                elements.design,
                -elements.designArea.offsetWidth / 2,
                -elements.designArea.offsetHeight / 2,
                elements.designArea.offsetWidth,
                elements.designArea.offsetHeight
            );
            ctx.restore();
            
            // Draw phone case overlay
            ctx.drawImage(elements.caseOverlay, 0, 0, canvas.width, canvas.height);
            
            // Create download link
            const link = document.createElement('a');
            link.download = 'custom-phone-case.png';
            link.href = canvas.toDataURL('image/png');
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // Initialize
        init();
    });
    </script>
</body>
</html>
