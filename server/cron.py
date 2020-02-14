from datetime import datetime
import atexit
from app import app
from lobUtils import LobUltilities

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ProcessPoolExecutor

from models import User

LobUtil = LobUltilities()

def send_birthday_post_card():
    now = datetime.now()
    users = User.query.filter_by(birthday_day=now.day, birthday_month=now.month).all()
    for user in users:
        try:
            LobUtil.send_post_card_to(user.id)
        except Exception as e:
            print(str(e))
    print('post cards to users with birthday {} {} sent'.format(now.month, now.day))

scheduler = BackgroundScheduler(daemon=True)
scheduler.add_job(func=send_birthday_post_card, trigger="cron", day='*')

scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())
