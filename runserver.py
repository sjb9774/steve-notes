from steve_notes.app import app
# have to import from views to have them apply at app.run()
from steve_notes.views import home

app.run(debug=True)