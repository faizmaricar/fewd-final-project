from makesoup import makesoup
from updateJSON import updateJSON

class CatalogItem(object):
    def __init__(self, url):
        self.url = url
        self.soup = makesoup(self.url)
        self.soup = self.soup.find("div", {"class":"CatalogFullDetail"})
    
    def getDetailFields(self):
        self.detailfields = ['Title', 'Publisher', 'mainContentImage', 'Text', 'ItemCode', 'Creators', 'ReleaseDate', 'SRP']
        return self.detailfields
    
    def get(self, detailfield):
        detailfields = self.getDetailFields()
        return self.soup.find("div", {"class": detailfields[detailfield]})
    
    def getTitle(self):
        self.title = self.get(0).string
        return self.title
    
    def getPublisher(self):
        self.publisher = self.get(1).string
        return self.publisher
    
    def getImage(self):
        self.image = self.url[:-18] + self.get(2).find("img")["src"]
        return self.image
    
    def getSynopsis(self):
        self.synopsis = str(self.get(3)).split("</div>")[2].split("<div")[0].replace("\r\n", "").strip()
        return self.synopsis
    
    def getItemCode(self):
        self.itemcode = self.url[-9:]
        return self.itemcode
    
    def getCreators(self):
        self.creators = self.get(5).string.replace("\r\n", "").split(" ")
        self.creators = " ".join([i for i in self.creators if i != ""]).replace("\n", "")
        return self.creators
    
    def getReleaseDate(self):
        self.releasedate = self.get(6).string
        return self.releasedate
    
    def getSRP(self):
        self.srp = self.get(7).string
        return self.srp
    def iscomic(self):
        return self.getCreators() != ""
    def getFullDetails(self):
        self.fulldetails = {}
        details = [
            self.getTitle(), 
            self.getPublisher(), 
            self.getImage(), 
            self.getSynopsis(), 
            self.getItemCode(),
            self.getCreators(),
            self.getReleaseDate(),
            self.getSRP()
        ]
        for i in range(len(self.getDetailFields())):
            self.fulldetails[self.getDetailFields()[i]] = details[i]
        return self.fulldetails
