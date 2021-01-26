import random
from Game4 import Game

class OverUnder(Game):
    def __init__(self):
        Game.__init__(self)
        self.__nCurrent = -1
    def takeTurn(self, sInput):
        if(self.__nCurrent == -1):
            self.__nComputer = random.randint(1,100)
            self.__nCurrent = 0
            return["Welcome to Over and Unders",
                   "The computer is thinking of a number between 1 and 99.",
                   "Try to guess in as few tries as possible."
                ]
        else:
            try:
                nInput = int(sInput)
                if nInput > self.__nComputer:
                    return[
                        "Too High"
                    ]
                elif nInput < self.__nComputer:
                    return[
                        "Too Low"
                    ]
                else:
                    self.isDone(True)
                    return[
                        "Just right"
                    ]
            except:
                return[
                    "please enter a number between 1 and 99"
                ]