from sqlalchemy import Column, String, ForeignKey
from steve_notes.db import Base
import uuid


class Note(Base):
	__tablename__ = "notes"

	id = Column(String(36), unique=True, primary_key=True, default=lambda: str(uuid.uuid4()))
	title = Column(String(1024))
	body = Column(String(4096))
	user_id = Column(String(24), ForeignKey("users.id"))

	def __init__(self, title=None, body=None):
		self.title = title
		self.body = body

	def dictify(self):
		return {"id": self.id, "title": self.title, "body": self.body}
