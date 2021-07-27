class PerseusAPIError(Exception):
    pass

class PerseusAPIReturnError(PerseusAPIError):
    pass

class PerseusAPIConnectionError(PerseusAPIError):
    pass

class PerseusAPIPathNotFoundError(PerseusAPIError):
    pass