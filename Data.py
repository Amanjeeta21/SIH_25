import csv
import random

num_rows = 10

# Define bounding box from your coordinates
lats = [11.074666, 11.074720, 11.073617, 11.073653]
lons = [76.615677, 76.616359, 76.615766, 76.616550]

min_lat, max_lat = min(lats), max(lats)
min_lon, max_lon = min(lons), max(lons)

with open("temp_fence_data.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Mission_ID","Owner","Location","Voltage","Fence_ID","Status"])
    
    for _ in range(num_rows):
        # Generate a random coordinate inside the bounding box
        lat = round(random.uniform(min_lat, max_lat), 6)
        lon = round(random.uniform(min_lon, max_lon), 6)
        coord = f"{lat},{lon}"
        
        writer.writerow([
            f"M{random.randint(100,999)}",
            random.choice(["Aman", "Ravi", "Sita", "Kiran"]),
            coord,
            round(random.uniform(2000,5000),2),
            f"F{random.randint(1,10)}",
            random.choice(["Active","Inactive"])
        ])
