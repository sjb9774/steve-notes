from steve_notes.app import app
# have to import from views to have them apply at app.run()
from steve_notes.views import home
from steve_notes.api.notes import *
from steve_notes.api.users import *

app.run(debug=True)