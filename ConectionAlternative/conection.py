class Conection:
    def __init__(self, host="localhost", user="root", password="", database="productos_db"):
 
        self.host = host          
        self.user = user          
        self.password = password  
        self.database = database  
        self.connection = None    
        
    def connect(self):

        try:
            import mysql.connector
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            print("Conexión exitosa a MySQL a través de XAMPP")
            return self.connection
        except Exception as e:
            print(f"Error al conectar a MySQL: {e}")
            return None
    
    def close(self):

        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Conexión cerrada")

if __name__ == "__main__":
   
    db = Conection(
        host="localhost",  
        user="root",      
        password="",      
        database="ecomers"  
    )
    
    conn = db.connect()
    
    if conn:
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM producto LIMIT 5")
        producto = cursor.fetchall()
        
        for producto in producto:
            print(producto)
            
        cursor.close()
 