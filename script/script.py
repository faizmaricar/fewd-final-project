from itemcodes import itemcodes
from validurl import validurl
from catalogItem import CatalogItem
from updateJSON import updateJSON
import json

with open('items.json', 'r') as f:
    data = json.load(f)
    start = itemcodes().index(data[0]["ItemCode"])
    f.close()
    
for itemcode in itemcodes()[start:]:
    if(validurl(itemcode) != None):
        item = CatalogItem(validurl(itemcode))
        if(item.iscomic()):
            updateJSON(item.getFullDetails())
        else:
            print(item.url, "is not comic")