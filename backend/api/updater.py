from .task import increase_profit_balance, increase_mining_balance, stop_mining_tasks, stop_trading_tasks
from apscheduler.schedulers.background import BackgroundScheduler

def start():
    scheduler= BackgroundScheduler()
    scheduler.add_job(increase_profit_balance, 'interval', seconds=1)
    scheduler.add_job(increase_mining_balance, 'interval', seconds=1)
    scheduler.add_job(stop_trading_tasks, 'interval', seconds=10)
    scheduler.add_job(stop_mining_tasks, 'interval', seconds=10)
    scheduler.start()