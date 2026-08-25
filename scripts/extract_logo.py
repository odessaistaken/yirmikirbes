import fitz # PyMuPDF
from PIL import Image
import os

pdf_path = r"C:\Users\Felina\.gemini\antigravity-ide\brain\2f0aff45-a621-4847-96f1-a045b7aac90d\.user_uploaded\media_1787658068660.pdf"

doc = fitz.open(pdf_path)
page = doc[0]

# Extract SVG
svg_data = page.get_svg_image()
with open(r"public\logo.svg", "w", encoding="utf-8") as f:
    f.write(svg_data)
print("Saved public/logo.svg")

# Render high-res PNG (4x scale, 288 DPI)
zoom = 4
mat = fitz.Matrix(zoom, zoom)
pix = page.get_pixmap(matrix=mat, alpha=True)
png_path = r"public\logo.png"
pix.save(png_path)
print("Saved public/logo.png")

# Let's inspect the image and make sure background is transparent if it has white bg
img = Image.open(png_path).convert("RGBA")
datas = img.getdata()

# Check corners to see if background is white and needs transparency
new_data = []
for item in datas:
    # If pixel is almost pure white, make it transparent
    if item[0] > 245 and item[1] > 245 and item[2] > 245:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

img.putdata(new_data)

# Crop bounding box of non-transparent pixels
bbox = img.getbbox()
if bbox:
    img_cropped = img.crop(bbox)
    # Add a small padding
    pad = 20
    final_img = Image.new("RGBA", (img_cropped.width + pad * 2, img_cropped.height + pad * 2), (255, 255, 255, 0))
    final_img.paste(img_cropped, (pad, pad))
    final_img.save(r"public\logo.png", "PNG")
    print(f"Saved cropped transparent logo.png: {final_img.size}")
    
    # Also create a light version for dark backgrounds (turning dark charcoal parts into white, keeping red parts red!)
    # Red parts: item[0] is high, item[1] and item[2] are lower.
    # Charcoal parts: item[0], item[1], item[2] are all low/grey ~ 40-70.
    light_data = []
    for item in final_img.getdata():
        if item[3] == 0:
            light_data.append((255, 255, 255, 0))
        elif item[0] > 150 and item[1] < 80 and item[2] < 80:
            # Red accent stays red
            light_data.append(item)
        else:
            # Charcoal parts become clean crisp white/cream
            light_data.append((255, 255, 255, item[3]))
            
    light_img = Image.new("RGBA", final_img.size)
    light_img.putdata(light_data)
    light_img.save(r"public\logo-light.png", "PNG")
    print(f"Saved public/logo-light.png: {light_img.size}")
