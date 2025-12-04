import json
import random
import re

# Map of State Name -> Unsplash Image ID
state_images = {
    "Andhra Pradesh": "photo-1532375810709-75b1da00537c",
    "Arunachal Pradesh": "photo-1626621341517-bbf3d9990a23",
    "Assam": "photo-1598335624129-e7d7c0c467e4",
    "Bihar": "photo-1596895111956-bf1cf0599ce5",
    "Chhattisgarh": "photo-1590664216212-62e7637d1606", 
    "Goa": "photo-1512343879784-a960bf40e7f2",
    "Gujarat": "photo-1570187952837-4c43e14915d5",
    "Haryana": "photo-1615828362335-857752003019",
    "Himachal Pradesh": "photo-1605649487215-4767868145b2",
    "Jharkhand": "photo-1580294647332-9457424d7306",
    "Karnataka": "photo-1600664769697-7093848878df",
    "Kerala": "photo-1602216056096-3b40cc0c9944",
    "Madhya Pradesh": "photo-1567817726652-8875b7b55347",
    "Maharashtra": "photo-1566552881560-0be862a7c445",
    "Manipur": "photo-1622303030623-6e3e1c0a0c9b",
    "Meghalaya": "photo-1589041127168-9b1915731839",
    "Mizoram": "photo-1622303030623-6e3e1c0a0c9b", # Placeholder reuse
    "Nagaland": "photo-1622303030623-6e3e1c0a0c9b", # Placeholder reuse
    "Odisha": "photo-1599423300746-b62507ac97f5",
    "Punjab": "photo-1514222134-b57cbb8ce073",
    "Rajasthan": "photo-1477587458883-47145ed94245",
    "Sikkim": "photo-1616148568149-c496bd281f44",
    "Tamil Nadu": "photo-1582510003544-4d00b7f74220",
    "Telangana": "photo-1572445271230-a78b5944a659",
    "Tripura": "photo-1622303030623-6e3e1c0a0c9b", # Placeholder reuse
    "Uttar Pradesh": "photo-1564507592333-c60657eea523",
    "Uttarakhand": "photo-1589825603716-5294664db9dd",
    "West Bengal": "photo-1558433916-90a36b44753f",
    "Delhi": "photo-1587474260584-136574528ed5",
    "Jammu and Kashmir": "photo-1566837945700-30057527ade0",
    "Ladakh": "photo-1581793745862-99fde7fa73d2",
    "Puducherry": "photo-1582510003544-4d00b7f74220", # Reuse TN
}

# Pool of generic India travel images for places
place_images_pool = [
    "photo-1524492412937-b28074a5d7da", "photo-1548013146-72479768bada", "photo-1519955045385-7cdb8e07c76f",
    "photo-1534234828563-025317354318", "photo-1477587458883-47145ed94245", "photo-1599661046289-e31897846e41",
    "photo-1505765057121-9b8f2c62c7d8", "photo-1507525428034-b723cf961d3e", "photo-1512453979798-5ea266f8880c",
    "photo-1598335624129-e7d7c0c467e4", "photo-1596895111956-bf1cf0599ce5", "photo-1512343879784-a960bf40e7f2",
    "photo-1570187952837-4c43e14915d5", "photo-1605649487215-4767868145b2", "photo-1600664769697-7093848878df",
    "photo-1602216056096-3b40cc0c9944", "photo-1567817726652-8875b7b55347", "photo-1566552881560-0be862a7c445",
    "photo-1589041127168-9b1915731839", "photo-1599423300746-b62507ac97f5", "photo-1514222134-b57cbb8ce073",
    "photo-1616148568149-c496bd281f44", "photo-1582510003544-4d00b7f74220", "photo-1572445271230-a78b5944a659",
    "photo-1564507592333-c60657eea523", "photo-1589825603716-5294664db9dd", "photo-1558433916-90a36b44753f",
    "photo-1587474260584-136574528ed5", "photo-1566837945700-30057527ade0", "photo-1581793745862-99fde7fa73d2"
]

def get_image_url(image_id):
    return f"https://images.unsplash.com/{image_id}?q=80&w=1200&auto=format&fit=crop"

file_path = "d:/major project/BharatYatra/bharat-yatra/data/states.js"

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract JSON part (remove "export const states = " and trailing ";")
    # Using regex to find the array start and end might be safer if there are comments, but assuming standard format
    match = re.search(r"export const states = (\[.*\]);?", content, re.DOTALL)
    if not match:
        print("Could not find states array in file.")
        exit(1)
    
    json_str = match.group(1)
    # Fix potential JS-specific syntax if any (like trailing commas), but assuming valid JSON-like structure
    # If it's pure JS object literals (keys without quotes), json.loads will fail.
    # We might need to use a more robust parser or regex replacement if it's not strict JSON.
    # Let's assume it's strict JSON based on previous view_file output (keys had quotes).
    
    try:
        states_data = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        # Fallback: simple regex replacement for state images if JSON parsing fails
        # This is risky for a full update but safer for just state images.
        # Let's try to proceed with regex replacement for state images directly in content if JSON fails.
        states_data = None

    if states_data:
        print("Successfully parsed JSON. Updating data...")
        for state in states_data:
            # Update State Image
            if state["name"] in state_images:
                state["image"] = get_image_url(state_images[state["name"]])
            
            # Update District and Place Images
            if "districts" in state:
                for district in state["districts"]:
                    # Random image for district
                    district["image"] = get_image_url(random.choice(place_images_pool))
                    
                    if "places" in district:
                        for place in district["places"]:
                            # Random image for place
                            place["image"] = get_image_url(random.choice(place_images_pool))

        # Convert back to string
        new_json_str = json.dumps(states_data, indent=2)
        new_content = f"export const states = {new_json_str};"
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Successfully updated states.js")

    else:
        print("Falling back to regex replacement for states only...")
        # If JSON parsing failed, we just update state images using regex
        new_content = content
        for state_name, image_id in state_images.items():
            # Regex to find the state object and its image field is hard.
            # Simpler: Find "name": "State Name" ... "image": "..."
            # This is complex with regex.
            pass
            
except Exception as e:
    print(f"Error: {e}")
