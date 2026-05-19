from PIL import Image, ImageDraw
import os

def draw_icon(size, bg_gradient=True):
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    padding = int(size * 0.12)
    r = int(size * 0.22)
    
    # Draw rounded rect background with gradient simulation via layers
    if bg_gradient:
        # Base gradient: blue (#2563eb) to purple (#7c3aed)
        for y in range(size):
            ratio = y / size
            r_col = int(37 + (124 - 37) * ratio)
            g_col = int(99 + (58 - 99) * ratio)
            b_col = int(235 + (173 - 235) * ratio)
            draw.line([(0, y), (size, y)], fill=(r_col, g_col, b_col))
    else:
        draw.rectangle([0, 0, size, size], fill=(37, 99, 235))
    
    # Mask to rounded rect
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, size, size], radius=r, fill=255)
    img.putalpha(mask)
    
    # Draw regression line
    line_width = max(2, int(size * 0.06))
    points = [
        (int(size * 0.23), int(size * 0.77)),
        (int(size * 0.39), int(size * 0.51)),
        (int(size * 0.61), int(size * 0.61)),
        (int(size * 0.82), int(size * 0.27)),
    ]
    draw.line(points, fill=(255, 255, 255), width=line_width)
    
    # Draw dots
    dot_radius = max(3, int(size * 0.045))
    dot_color = (251, 191, 36)  # #fbbf24 amber/gold
    for x, y in points:
        draw.ellipse([x - dot_radius, y - dot_radius, x + dot_radius, y + dot_radius], fill=dot_color)
    
    return img

# Create favicon.ico with multiple sizes
sizes = [16, 32, 48]
images = [draw_icon(s) for s in sizes]
# Convert to RGBA with white background for ICO
ico_images = []
for im in images:
    bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
    bg.paste(im, mask=im.split()[3])
    ico_images.append(bg.convert('RGB'))

ico_images[0].save(
    os.path.join('public', 'favicon.ico'),
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=ico_images[1:]
)

# Create apple-touch-icon.png (180x180 with solid background, no transparency)
apple = draw_icon(180)
# Composite onto white background for Apple touch icon
bg = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
bg.paste(apple, mask=apple.split()[3])
bg.convert('RGB').save(os.path.join('public', 'apple-touch-icon.png'), 'PNG')

# Also create a 192x192 and 512x512 for PWA/manifest
for s in [192, 512]:
    im = draw_icon(s)
    bg = Image.new('RGBA', (s, s), (255, 255, 255, 255))
    bg.paste(im, mask=im.split()[3])
    bg.convert('RGB').save(os.path.join('public', f'icon-{s}x{s}.png'), 'PNG')

print('Favicon files generated successfully:')
print(' - public/favicon.ico (16x16, 32x32, 48x48)')
print(' - public/apple-touch-icon.png (180x180)')
print(' - public/icon-192x192.png')
print(' - public/icon-512x512.png')