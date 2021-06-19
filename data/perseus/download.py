"""
File Downloads
"""
import requests
import json
import io
import os
import hashlib
from os import path
import glob

dir = os.path.dirname(__file__)

#REMINDER TO ADD WHITELIST/BLACKLIST FOR DOWNLOADS

def init(force: bool=False):
    if not isinstance(force, bool):
        raise TypeError("argument force should be of type bool")


    #Create data folders if they don't exist
    for folder in glob.glob(os.path.join(dir, "*", "")):
        ##Create folder if folder does not exist and not in __pycahce__
        if (not os.path.isdir(os.path.join(folder,'data')) and not folder.endswith("__pycache__/")):
            os.mkdir(os.path.join(folder,'data'))

    kept = 0
    changed = 0
    downloaded = 0
    deleted = 0

    downloaded_files = glob.glob("**/**/data/*.json")
    for i,val in enumerate(downloaded_files):
        downloaded_files[i] = path.join(dir,val).replace("perseus/perseus","perseus")

    #Get checksums
    j = requests.get('https://raw.githubusercontent.com/Drakomire/perseus-data/master/dist/checksums.json').content
    checksums = json.loads(j)

    for key in checksums:
        filepath = path.join(dir,key.replace("/","/data/"))
        if (path.exists(filepath) and not force):
            #Checksum file to chek for changes
            #If the checksum is differnt redownload the file
            f = open(filepath, "rb")
            if (checksums[key] == hashlib.md5(f.read()).hexdigest()):
                kept += 1
            else:
                j = requests.get('https://raw.githubusercontent.com/Drakomire/perseus-data/master/dist/'+key).content
                f = open(filepath, "w")
                f.write(j.decode("utf-8"))
                changed+=1
            f.close()
        else:
            #Download the file
            downloaded += 1
            j = requests.get('https://raw.githubusercontent.com/Drakomire/perseus-data/master/dist/'+key).content
            f = open(filepath, "w")
            f.write(j.decode("utf-8"))
            f.close()
        if filepath in downloaded_files:
            downloaded_files.remove(filepath)

    #Remove all the depecated files
    for i in downloaded_files:
        deleted += 1
        os.remove(i)

    if (not force):
        print("Perseus:",downloaded+changed,"files downloaded.",deleted,"files deleted.",kept,"files did not require an update.")
    else:
        print("Perseus:",downloaded+changed,"files downloaded.",deleted,"files deleted.")
