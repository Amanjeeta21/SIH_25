import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Hello123",
    database="electric_fence_db"
)

cursor = conn.cursor()

# Function to print data nicely
def fetch_table_data(table_name):
    try:
        cursor.execute(f"SELECT * FROM {table_name};")
        rows = cursor.fetchall()
        if not rows:
            print(f"\n{table_name} is empty.")
            return
        
        headers = [i[0] for i in cursor.description]
        
        # Calculate column widths
        col_widths = [len(h) for h in headers]
        for row in rows:
            for i, val in enumerate(row):
                col_widths[i] = max(col_widths[i], len(str(val)))
        
        # Print header
        header_row = " | ".join(h.ljust(col_widths[i]) for i, h in enumerate(headers))
        print("\n" + header_row)
        print("-" * len(header_row))
        
        # Print rows
        for row in rows:
            print(" | ".join(str(val).ljust(col_widths[i]) for i, val in enumerate(row)))
        
    except mysql.connector.Error as err:
        print(f"Error fetching {table_name}: {err}")

# Show tables
cursor.execute("SHOW TABLES;")
tables = cursor.fetchall()
print("Tables in database:")
for table in tables:
    print(table[0])

# Fetch data
fetch_table_data("fence_inventory")
fetch_table_data("detection_log")

conn.close()
