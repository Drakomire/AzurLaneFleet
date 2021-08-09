def getNickname(name,object):
    '''
    :param name: ship's name. All lowercase for my stuff.
    :return: Ship nickname is correct capitalization.
    '''
    #if answer is a nickname, replace answer with ship it is referencing.
    if name.lower() in object:
        name = object[name.lower()]
    return name
