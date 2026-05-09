from flask import Flask
from flask_cors import CORS
from database import db
from routes import register_routes

app = Flask(__name__)

# ─── Configuração do banco de dados SQLite ───────────────────────────────────
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///abc_digital.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ─── CORS: permite que o Vite (localhost:5173) acesse a API ──────────────────
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

db.init_app(app)

# ─── Registra todas as rotas ─────────────────────────────────────────────────
register_routes(app)

# ─── Cria tabelas e popula dados iniciais ─────────────────────────────────────
with app.app_context():
    db.create_all()
    from seed import seed_database
    seed_database()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
