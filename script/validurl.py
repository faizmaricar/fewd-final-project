from http.client import HTTPConnection

def validurl(itemcode, retry_count=0):
    domain = "www.previewsworld.com"
    catalogdir = "/catalog/"
    itemdir = catalogdir + itemcode
    url = "http://" + domain + itemdir
    conn = HTTPConnection(domain)
    conn.request("HEAD", itemdir)
        
    if(conn.getresponse().status == 200):
        print(url, "exists")
        return url
    else:
        print(url, "does not exists")
        return None