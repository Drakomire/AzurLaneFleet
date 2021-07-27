# from __future__ import annotations

import json
import os
from .nicknames import *
from enum import Enum, auto

#Constants
STAT_KEYWORDS = {
  "durability": "hp",
  "cannon" : "fp",
  "antiaircraft" : "aa",
  "torpedo" : "trp",
  "air" : "avi",
  "reload" : "rld",
  "dodge" : "eva",
  "hit" : "acc"
}

class Pos(Enum):
  FLAGSHIP = auto()
  UPPER_CONSORT = auto()
  LOWER_CONSORT = auto()
  LEADER = auto()
  CENTER = auto()
  REAR = auto()
  UNKOWN = auto()

  @staticmethod
  def _skillDef(val: "Pos") -> str:
    if val.value == Pos.FLAGSHIP.value:
      return "onFlagShip"
    elif val.value == Pos.LEADER.value:
      return "onLeader"
    elif val.value == Pos.CENTER.value:
      return "onCenter"
    elif val.value == Pos.REAR.value:
      return "onRear"
    elif val.value == Pos.UPPER_CONSORT.value:
      return "onUpperConsort"
    elif val.value == Pos.LOWER_CONSORT.value:
      return "onLowerConsort"

    return None