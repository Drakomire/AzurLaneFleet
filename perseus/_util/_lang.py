from __future__ import annotations
from enum import Enum, auto

class InvalidLangError(Exception):
    pass

class Lang(Enum):
    EN = auto()
    JP = auto()
    CN = auto()

    @staticmethod
    def _value(lang: Lang) -> str:
        if lang in language_dictionary:
            return language_dictionary[lang]
        else:
            raise InvalidLangError(lang)

language_dictionary = {
    Lang.EN : "en",
    Lang.JP : "jp",
    Lang.CN : "cn"
}