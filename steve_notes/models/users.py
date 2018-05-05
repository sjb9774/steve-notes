from sqlalchemy import Column, String
from steve_notes.db import Base


class User(Base):

	__tablename__ = "users"

	id = Column(String(36), unique=True, primary_key=True)
	username = Column(String(128))
	email = Column(String(512))
	first_name = Column(String(128))
	last_name = Column(String(128))

	def dictify(self):
		return {
			"id": self.id,
			"username": self.username,
			"email": self.email,
			"firstName": self.first_name,
			"lastName": self.last_name
		}