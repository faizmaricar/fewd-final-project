def itemcodes():
    itemcodes = []
    months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    years = range(10, 17)

    for year in years:
        for month in months:
            for i in range(4000):
                if(i >=0 and i <10):
                    itemcodes.append(month + str(year) + "000" + str(i))
                elif(i >= 10 and i < 100):
                    itemcodes.append(month + str(year) + "00" + str(i))
                elif(i >= 100 and i < 1000):
                    itemcodes.append(month + str(year) + "0" + str(i))
                elif(i >= 1000 and i < 10000):
                    itemcodes.append(month + str(year) + str(i))
    
    return itemcodes