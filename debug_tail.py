import os

file_path = r'd:\major project\BharatYatra\bharat-yatra\data\states.js'
output_path = r'd:\major project\BharatYatra\bharat-yatra\debug_output.txt'

try:
    with open(file_path, 'rb') as f:
        f.seek(-100, 2)
        tail = f.read()
        
    with open(output_path, 'w') as out:
        out.write(f"Tail (hex): {tail.hex()}\n")
        out.write(f"Tail (repr): {repr(tail)}\n")
        
except Exception as e:
    with open(output_path, 'w') as out:
        out.write(f"Error: {e}")
