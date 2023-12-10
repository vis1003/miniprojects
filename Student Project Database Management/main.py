import sys, json
import smtplib
from pymongo import MongoClient
from pymongo import collection
from tabulate import tabulate

CONNECTION_STRING = 'mongodb+srv://mongouser:weakpassword@collegedb.fnaijhq.mongodb.net/?retryWrites=true&w=majority'

# Function to send email to Students
def sendemail(email_address):
    
    sender_email_id = "mini2022project@outlook.com"
    s = smtplib.SMTP('smtp.outlook.com', 587)
    s.starttls()
    s.login(sender_email_id, "mini@2022")
    message = """\
     Subject : REMAINDER MAIL
     Dear Student,
     Mini project not submitted."""
     
    s.sendmail(sender_email_id, email_address , message) 
    s.quit()

# Insert Data into the database
def postdata(name, email, usn, miniproject='NULL', submitted=False):
    record = {
        "name" : name,
        "email" : email,
        "usn" : usn,
        "miniproject" : miniproject,
        "submitted" : submitted
    }

    cluster = MongoClient(CONNECTION_STRING)
    db = cluster["StudentDB"]
    coll = db["StudentData"]
    coll.insert_one(record)

# To-Do : Add advanced search of data
# https://towardsdatascience.com/using-mongo-databases-in-python-e93bc3b6ff5f

def displaydata():
    cluster = MongoClient(CONNECTION_STRING)
    db = cluster["StudentDB"]
    coll = db["StudentData"]
    records = list(coll.find({}))
    # for document in records:
    #     del document[0]

    #headers = records[0].keys()
    #rows = [x.values() for x in values]
    print(tabulate(records))
    #print(tabulate([(i,) +records[i] for i in records], headers=headers))
    # for document in records:
    #     print(document)
    
def menu():
    while True:
        print("1. Enter Details")
        print("2. Display Database")
        print("3. Send Email")
        print("4. Exit")

        option = input("Choose one of the above options : ")
        
        match option:
            case '1' : 
                name = input("Enter Student name : ")
                if name == '':
                    print("Student's name is a mandatory field!\n")
                    continue
                email = input("Enter student email : ")
                if email == '':
                    print("Student's email is a mandatory field!\n")
                    continue
                usn = input("Enter Student USN : ")
                if usn == '':
                    print("Student's USN is a mandatory field!\n")
                    continue
                miniproject = input("Enter Student's Miniproject : ")
                submitted = input("Has the student submitted the miniproject ? T/F : ")
                if submitted == 'T':
                    submitted = True
                else:
                    submitted = False
                
                postdata(name, email, usn, miniproject, submitted)
            
            case '2':
                displaydata()
            
            case '3':
                cluster = MongoClient(CONNECTION_STRING)
                db = cluster["StudentDB"]
                coll = db["StudentData"]

                #checking if project is submitted and calling sendemail() for students not submitted
                results=coll.find({"submitted":False})
                for x in results:
                    print(x["email"])
                    #print(x["email"]) should be replaced with sendemail(x["email"])
                    #but the function is showing an error when i run it

            case '4':
                print("Exiting program ...")
                sys.exit()

# Main Function
def main():
    try:   
        cluster = MongoClient(CONNECTION_STRING)
        print("MongoDB Connection Initiated")
    except:
        print("Connection Error!")
        sys.exit()
    
    menu()

if __name__ == "__main__":
    main()