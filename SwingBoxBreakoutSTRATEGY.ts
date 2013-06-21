#############SWING BOX BREAKOUT############
# WGRIFFITH2 (C) 2013
# STRATEGY IS BUILT ON THE FOLLOWING PREMISE(S)
# DAVAS BOX BREAKOUT - NEW THREE DAY HIGH WITH HEAVY VOLUME
# NON-OVER-BOUGHT STOCK BASED ON STOCHASTIC SLOW

INPUT SIDE = "LONG";
INPUT PERIODS = 3;
INPUT OVER_BOUGHT = 30;
INPUT AVGVOL = 50;

DEF KPERIOD = 14;
DEF DPERIOD = 3;

# STOCH SLOW LIMIT 
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD));
DEF SLOWLINE = ROUND(SIMPLEMOVINGAVG(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD REQUIREMENT
DEF MACD = MACD("fast length" = 5, "slow length" = 35, "macd length" = 5) < 0;

DEF NEW_PERIOD = PERIODS - 1;
DEF BUYSIGNAL = VOLUMEAVG(LENGTH = AVGVOL) > VOLUMEAVG(LENGTH = AVGVOL).VOLAVG AND SLOWLINE <= OVER_BOUGHT AND FASTLINE > FASTLINE[1] AND MACD IS TRUE AND CLOSE>CLOSE[1];
DEF ENTRY = BUYSIGNAL IS TRUE;
DEF ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = PERIODS)[1];
DEF STOPLOSS = (LOW <= ROLLINGLOW AND SLOWLINE>FASTLINE AND ENTRY IS FALSE);
DEF SHARES = ROUND(10000 / CLOSE);

#LONG POSITION:
ADDORDER(ORDERTYPE.BUY_TO_OPEN, ENTRY IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "LE");
ADDORDER(ORDERTYPE.SELL_TO_CLOSE, STOPLOSS IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX");

##################################################