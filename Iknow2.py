class Game:
    def __init__(self):
        self.__nCurrent = -1
    def takeTurn(self, sInput):
        if(self.__nCurrent == -1):
            self.__nCurrent = 0
            return["Welcome to I know you are",
                   "This is an annoying game you might have played",
                   "with your sibling."
                ]
        else:
            return["I know you are a", sInput, "But what am I?"]