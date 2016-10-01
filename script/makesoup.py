from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

def makesoup(url):
    request = Request(url)
    response = urlopen(request)
    html = response.read()
    soup = BeautifulSoup(html, "lxml")
    return soup