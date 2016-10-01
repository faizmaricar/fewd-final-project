import json

def updateJSON(itemdetails):
    data_file = open('items.json', "r")
    data = json.load(data_file)
    data_file.close()
    if itemdetails not in data and itemdetails != None:
        data.insert(0, itemdetails)
        data_file = open('items.json', "w")
        json.dump(data, data_file, indent=4)
        data_file.close()
    print("JSON updated")