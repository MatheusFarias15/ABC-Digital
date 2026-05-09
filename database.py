from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Module(db.Model):
    __tablename__ = "modules"

    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    lessons_count = db.Column(db.Integer, default=0)
    completed_lessons = db.Column(db.Integer, default=0)

    lessons = db.relationship("Lesson", backref="module", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "icon": self.icon,
            "description": self.description,
            "color": self.color,
            "lessonsCount": self.lessons_count,
            "completedLessons": self.completed_lessons,
        }


class Lesson(db.Model):
    __tablename__ = "lessons"

    id = db.Column(db.String, primary_key=True)
    module_id = db.Column(db.String, db.ForeignKey("modules.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content_type = db.Column(db.String(20), nullable=False)  # letra | silaba | palavra | frase
    image_url = db.Column(db.String(255), nullable=False)
    text_content = db.Column(db.String(255), nullable=False)
    order_index = db.Column(db.Integer, nullable=False)

    exercises = db.relationship("Exercise", backref="lesson", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "moduleId": self.module_id,
            "title": self.title,
            "contentType": self.content_type,
            "imageUrl": self.image_url,
            "textContent": self.text_content,
            "orderIndex": self.order_index,
        }


class Exercise(db.Model):
    __tablename__ = "exercises"

    id = db.Column(db.String, primary_key=True)
    lesson_id = db.Column(db.String, db.ForeignKey("lessons.id"), nullable=False)
    type = db.Column(db.String(30), nullable=False)  # multiple_choice | audio_select
    question_text = db.Column(db.String(255), nullable=False)

    options = db.relationship("ExerciseOption", backref="exercise", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "lessonId": self.lesson_id,
            "type": self.type,
            "questionText": self.question_text,
            "options": [o.to_dict() for o in self.options],
        }


class ExerciseOption(db.Model):
    __tablename__ = "exercise_options"

    id = db.Column(db.String, primary_key=True)
    exercise_id = db.Column(db.String, db.ForeignKey("exercises.id"), nullable=False)
    content = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    is_correct = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "imageUrl": self.image_url,
            "isCorrect": self.is_correct,
        }


class Achievement(db.Model):
    __tablename__ = "achievements"

    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    icon = db.Column(db.String(10), nullable=False)
    unlocked = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "icon": self.icon,
            "unlocked": self.unlocked,
        }
