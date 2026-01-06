#!/usr/bin/env python3
"""
Generate a new OpenGraph image for KubeGraf.
Size: 1200x630 (standard OG image size)
Design: Dark background with logo and minimal text
"""

from PIL import Image, ImageDraw, ImageFont
import os
import subprocess

def create_opengraph_image(logo_svg_path):
    # Dimensions
    width = 1200
    height = 630

    # Create image with dark background (similar to brand)
    img = Image.new('RGB', (width, height), color=(10, 22, 40))  # #0a1628
    draw = ImageDraw.Draw(img)

    # Convert SVG logo to PNG temporarily
    logo_img = None
    logo_png_path = logo_svg_path.replace('.svg', '_temp_og.png')
    try:
        # Try to convert SVG to PNG with ImageMagick/magick
        try:
            subprocess.run(['magick', 'convert', '-background', 'none', '-resize', '180x180',
                           logo_svg_path, logo_png_path], check=True, capture_output=True)
        except:
            subprocess.run(['convert', '-background', 'none', '-resize', '180x180',
                           logo_svg_path, logo_png_path], check=True, capture_output=True)
        logo_img = Image.open(logo_png_path).convert('RGBA')
        print('✓ Logo converted successfully')
    except Exception as e:
        print(f'⚠ Could not convert SVG logo: {e}')

    # If we have logo, paste it centered above text
    logo_y_position = 140
    if logo_img:
        logo_x = (width - logo_img.width) // 2
        logo_y = logo_y_position
        # Composite the logo
        img.paste(logo_img, (logo_x, logo_y), logo_img)
        print(f'✓ Logo placed at ({logo_x}, {logo_y})')

        # Clean up temp file
        if os.path.exists(logo_png_path):
            os.remove(logo_png_path)

    # Load font - try multiple options
    title_size = 76
    tagline_size = 38

    title_font = None
    tagline_font = None

    font_paths = [
        '/System/Library/Fonts/Helvetica.ttc',
        '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    ]

    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                title_font = ImageFont.truetype(font_path, title_size)
                tagline_font = ImageFont.truetype(font_path, tagline_size)
                print(f'✓ Using font: {font_path}')
                break
            except Exception as e:
                continue

    if not title_font:
        print('⚠ Could not load system fonts, using basic rendering')
        # PIL's default font is too small, so we'll draw bigger
        title_font = ImageFont.load_default()
        tagline_font = ImageFont.load_default()

    # Text content
    title = "KubeGraf"  # Using regular e for compatibility
    tagline = "Local-first Kubernetes incident intelligence"

    # Calculate text positions (centered)
    title_y = 360
    tagline_y = 450

    # For better centering, use textbbox if available
    try:
        title_bbox = draw.textbbox((0, 0), title, font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        tagline_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
        tagline_width = tagline_bbox[2] - tagline_bbox[0]
    except:
        # Fallback for older PIL
        title_width = draw.textlength(title, font=title_font)
        tagline_width = draw.textlength(tagline, font=tagline_font)

    title_x = (width - title_width) // 2
    tagline_x = (width - tagline_width) // 2

    # Draw text with shadow for contrast
    shadow_color = (0, 0, 0)  # Black shadow
    shadow_offset = 4

    # Title shadow
    draw.text((title_x + shadow_offset, title_y + shadow_offset), title, fill=shadow_color, font=title_font)
    # Title main (white)
    draw.text((title_x, title_y), title, fill=(255, 255, 255), font=title_font)

    # Accent line
    line_y = 420
    line_x1 = width // 2 - 300
    line_x2 = width // 2 + 300
    draw.line([(line_x1, line_y), (line_x2, line_y)], fill=(6, 182, 212), width=4)  # #06b6d4

    # Tagline shadow
    draw.text((tagline_x + shadow_offset, tagline_y + shadow_offset), tagline, fill=shadow_color, font=tagline_font)
    # Tagline main (cyan)
    draw.text((tagline_x, tagline_y), tagline, fill=(6, 182, 212), font=tagline_font)

    print(f'✓ Text rendered at title:({title_x}, {title_y}) tagline:({tagline_x}, {tagline_y})')

    return img

if __name__ == '__main__':
    # Get project root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    # Logo path
    logo_svg_path = os.path.join(project_root, 'client', 'public', 'kubegraf.svg')

    print(f'Generating OpenGraph image...')
    print(f'Logo: {logo_svg_path}')

    # Generate image
    img = create_opengraph_image(logo_svg_path)

    # Save to multiple locations
    output_paths = [
        os.path.join(project_root, 'client', 'public', 'opengraph-v2.jpg'),
        os.path.join(project_root, 'opengraph-v2.jpg'),  # Root for build script
    ]

    for path in output_paths:
        img.save(path, 'JPEG', quality=95, optimize=True)
        print(f'✓ Saved: {path}')

    print(f'\n✅ New OpenGraph image generated (1200x630)')
