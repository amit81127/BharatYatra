import os

file_path = r'd:\major project\BharatYatra\bharat-yatra\data\states.js'

with open(file_path, 'rb+') as f:
    f.seek(-5, 2)  # Go to near end
    end_content = f.read()
    print(f"End content: {end_content}")
    
    # We expect b'];' or b'\r\n];' or similar
    # Let's replace '];' with ']];'
    
    content_str = end_content.decode('utf-8')
    if '];' in content_str:
        new_end = content_str.replace('];', ']];')
        f.seek(-len(content_str), 2) # Go back
        f.write(new_end.encode('utf-8'))
        print("Fixed: Replaced ]; with ]];")
    else:
        print("Could not find ]; at the end")
