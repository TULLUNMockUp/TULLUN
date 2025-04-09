{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const imageUpload = document.getElementById('image-upload');\
const userDesign = document.getElementById('user-design');\
const phoneCase = document.getElementById('phone-case');\
const downloadBtn = document.getElementById('download-btn');\
\
// Handle image upload\
imageUpload.addEventListener('change', (e) => \{\
    const file = e.target.files[0];\
    if (file) \{\
        const reader = new FileReader();\
        reader.onload = (event) => \{\
            userDesign.src = event.target.result;\
            userDesign.style.display = 'block';\
        \};\
        reader.readAsDataURL(file);\
    \}\
\});\
\
// Download mockup\
downloadBtn.addEventListener('click', () => \{\
    const canvas = document.createElement('canvas');\
    const ctx = canvas.getContext('2d');\
    canvas.width = phoneCase.width;\
    canvas.height = phoneCase.height;\
\
    // Draw user design first (adjust position/size as needed)\
    ctx.drawImage(userDesign, 50, 100, 200, 400);\
\
    // Draw phone case mockup on top\
    ctx.drawImage(phoneCase, 0, 0, canvas.width, canvas.height);\
\
    // Create download link\
    const link = document.createElement('a');\
    link.download = 'custom-phone-case.png';\
    link.href = canvas.toDataURL('image/png');\
    link.click();\
\});}