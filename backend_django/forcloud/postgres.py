import psycopg2

db_host = "project-duckkeyshop.ci8rgalf5ehr.us-east-1.rds.amazonaws.com"
db_name = "project_duckkeyShop"
db_user = "postgres"
db_pass = "password"

connection = psycopg2.connect(host=db_host, database=db_name, user=db_user, password=db_pass)
print("connected to DB")

cursor = connection.cursor()
cursor.execute('SELECT VERSION()')
db_version = cursor.fetchone()
print(db_version)

cursor.close()