from .__init__ import *

def getNickname(name):
    '''
    :param name: ship's name. All lowercase for my stuff.
    :return: Ship nickname is correct capitalization.
    '''
    #if answer is a nickname, replace answer with ship it is referencing.
    if name.lower() in nicknames:
        name = nicknames[name.lower()];

    return name;
