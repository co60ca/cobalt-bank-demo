from flask import Flask, jsonify, request
from flask_cors import CORS
import json

import config

import psycopg2

conn = psycopg2.connect(dbname=config.dbname, host=config.host, 
        user=config.user, password=config.password)


app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'https://co60ca.github.io'])

def checkobj(dic, *args):
    for arg in args:
        if arg in dic:
            dic = dic[arg]
        else:
            return None
    else:
        return dic


@app.route("/api/v1/dataObject", methods=['POST'])
def dataObject():
    jsond = request.get_json()
   
    email = ''

    et = checkobj(jsond, 'user', 'email')
    if et:
        email = et

    et = checkobj(jsond, 'login', 'username')
    if et:
        email = et

    visid = ''

    vt = checkobj(jsond, 'login', 'visid')
    if vt:
        visid = vt
    
    cur = conn.cursor()
    jstring = json.dumps(jsond)

    cur.execute("insert into logs (email, visid, data) values (%s, %s, %s)",
            (email, visid, jstring))
    conn.commit()
    cur.close()
    

    return "OK", 200


@app.route("/", methods=['GET'])
def echo():
    return "OK", 200
