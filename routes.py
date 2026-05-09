import os
from flask import jsonify, request, send_from_directory, abort
from database import db, Module, Lesson, Exercise, Achievement


# Pasta onde ficam as imagens (copie src/assets/* do frontend para cá)
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "assets")


def register_routes(app):

    # ── Health check ───────────────────────────────────────────────────────────
    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok", "message": "ABC Digital API rodando!"})

    # ── Servir imagens locais ──────────────────────────────────────────────────
    @app.route("/api/assets/<path:filename>")
    def serve_asset(filename):
        if not os.path.isdir(ASSETS_DIR):
            abort(404)
        return send_from_directory(ASSETS_DIR, filename)

    # ── Módulos ────────────────────────────────────────────────────────────────
    @app.route("/api/modules", methods=["GET"])
    def get_modules():
        modules = Module.query.order_by(Module.id).all()
        return jsonify([m.to_dict() for m in modules])

    @app.route("/api/modules/<string:module_id>", methods=["GET"])
    def get_module(module_id):
        module = Module.query.get_or_404(module_id)
        return jsonify(module.to_dict())

    # ── Lições ─────────────────────────────────────────────────────────────────
    @app.route("/api/lessons", methods=["GET"])
    def get_lessons():
        module_id = request.args.get("moduleId")
        query = Lesson.query
        if module_id:
            query = query.filter_by(module_id=module_id)
        lessons = query.order_by(Lesson.order_index).all()
        return jsonify([l.to_dict() for l in lessons])

    @app.route("/api/lessons/<string:lesson_id>", methods=["GET"])
    def get_lesson(lesson_id):
        lesson = Lesson.query.get_or_404(lesson_id)
        return jsonify(lesson.to_dict())

    # ── Exercícios ─────────────────────────────────────────────────────────────
    @app.route("/api/exercises", methods=["GET"])
    def get_exercises():
        lesson_id = request.args.get("lessonId")
        module_id = request.args.get("moduleId")

        query = Exercise.query

        if lesson_id:
            query = query.filter_by(lesson_id=lesson_id)
        elif module_id:
            # Busca exercícios de todas as lições do módulo
            lesson_ids = [
                l.id for l in Lesson.query.filter_by(module_id=module_id).all()
            ]
            query = query.filter(Exercise.lesson_id.in_(lesson_ids))

        exercises = query.all()
        return jsonify([e.to_dict() for e in exercises])

    @app.route("/api/exercises/<string:exercise_id>", methods=["GET"])
    def get_exercise(exercise_id):
        exercise = Exercise.query.get_or_404(exercise_id)
        return jsonify(exercise.to_dict())

    # ── Conquistas ─────────────────────────────────────────────────────────────
    @app.route("/api/achievements", methods=["GET"])
    def get_achievements():
        achievements = Achievement.query.all()
        return jsonify([a.to_dict() for a in achievements])

    @app.route("/api/achievements/<string:achievement_id>/unlock", methods=["PATCH"])
    def unlock_achievement(achievement_id):
        achievement = Achievement.query.get_or_404(achievement_id)
        achievement.unlocked = True
        db.session.commit()
        return jsonify(achievement.to_dict())

    # ── Progresso do módulo ────────────────────────────────────────────────────
    @app.route("/api/modules/<string:module_id>/progress", methods=["PATCH"])
    def update_module_progress(module_id):
        module = Module.query.get_or_404(module_id)
        data = request.get_json()
        if "completedLessons" in data:
            module.completed_lessons = data["completedLessons"]
            db.session.commit()
        return jsonify(module.to_dict())
