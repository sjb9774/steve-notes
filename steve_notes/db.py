from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from contextlib import contextmanager

Base = declarative_base()

db = create_engine("mysql://root:@localhost/steve_notes", echo=True)
Session = sessionmaker(bind=db)


@contextmanager
def db_session(commit_and_flush=True):
	global Session
	session = Session()
	yield session
	if commit_and_flush:
		session.flush()
		session.commit()