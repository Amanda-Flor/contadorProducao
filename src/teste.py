# import mysql.connector
# import sys 
# from mysql.connector import (connection)
# from mysql.connector import errorcode
# try:
# 	db_connection = mysql.connector.connect(host='localhost', user='root', password='', database='teste')
# 	print("Database connection made!")
# except mysql.connector.Error as error:
# 	if error.errno == errorcode.ER_BAD_DB_ERROR:
# 		print("Database doesn't exist")
# 	elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
# 		print("User name or password is wrong")
# 	else:
# 		print(error)
# else:
# 	db_connection.close()




# db_connection = mysql.connector.connect(host="localhost", user="root", password="", database="contadorproducao")
# cursor = db_connection.cursor()
# sql = "INSERT INTO producoes (data_inicio_producao, data_final_producao, video_producao, quantidade_producao, status_producao, cod_funcionario, cod_maquina, cod_ordemProducao ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
# values = ('current_date', '', 'producao10.mp4', '0', 'em produção', cod_ordemProducao, cod_funcionario, cod_maquina)
# cursor.execute(sql, values)


# sql = ("SELECT data_inicio_producao,data_final_producao, video_producao, quantidade_producao, status_producao, cod_funcionario, cod_maquina, cod_ordemProducao FROM producoes")
# cursor.execute(sql)

# for (data_inicio_producao,data_final_producao, video_producao, quantidade_producao, status_producao, cod_funcionario, cod_maquina, cod_ordemProducao) in cursor:
#   print(data_inicio_producao,data_final_producao, video_producao, quantidade_producao, status_producao, cod_funcionario, cod_maquina, cod_ordemProducao)
# print("\n")

# db_connection.commit()

