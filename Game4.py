class Game:
    def __init__(self):
        self.__isDone = False
    def isDone(self, isDone=False):
        if isDone:
            self.__isDone = isDone
        return self.__isDone
